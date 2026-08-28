// Google Apps Script — Code.gs
// ─────────────────────────────────────────────────────────────────────────────
// INSTRUCCIONES DE DEPLOY:
//
// 1. Ve a https://script.google.com → Nuevo proyecto
// 2. Pega este código completo en Code.gs
// 3. Guarda (Ctrl+S) y selecciona "Ejecutar > doGet" para autorizar permisos
//    del calendario (acepta todos los permisos de Google Calendar)
// 4. Clic en "Implementar > Nueva implementación"
//    - Tipo: Aplicación web
//    - Ejecutar como: Yo (diego@...)
//    - Quién tiene acceso: Cualquier usuario
// 5. Copia la URL generada (termina en /exec)
// 6. Pégala en tu .env.local como VITE_APPS_SCRIPT_URL=<URL>
// ─────────────────────────────────────────────────────────────────────────────

var CALENDAR_ID = "primary"; // o el ID específico del calendario
var TIMEZONE = "America/Bogota"; // UTC-5
var BASE_SLOTS = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

// Duración en minutos por servicio (para calcular el fin del evento)
var SERVICE_DURATION = {
  tattoo_session: 180,        // 3 horas mínimo
  design_consultation: 60,    // 1 hora
  flash_day: 90,              // 1.5 horas
};

// ── CORS helper ───────────────────────────────────────────────────────────────
function corsOutput(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── doGet — disponibilidad ────────────────────────────────────────────────────
function doGet(e) {
  try {
    var action = e.parameter.action;

    if (action === "availability") {
      var date = e.parameter.date; // "YYYY-MM-DD"
      if (!date) return corsOutput({ error: "Parámetro 'date' requerido", busySlots: [] });
      return corsOutput(getAvailability(date));
    }

    return corsOutput({ error: "Acción desconocida" });
  } catch (err) {
    return corsOutput({ error: err.message, busySlots: [] });
  }
}

// ── doPost — crear reserva ────────────────────────────────────────────────────
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    if (body.action === "book") {
      return corsOutput(createBooking(body));
    }

    return corsOutput({ ok: false, error: "Acción desconocida" });
  } catch (err) {
    return corsOutput({ ok: false, error: err.message });
  }
}

// ── getAvailability ───────────────────────────────────────────────────────────
function getAvailability(date) {
  // Rango completo del día en Bogotá (UTC-5)
  var dayStart = new Date(date + "T00:00:00-05:00");
  var dayEnd   = new Date(date + "T23:59:59-05:00");

  var events = Calendar.Events.list(CALENDAR_ID, {
    timeMin: dayStart.toISOString(),
    timeMax: dayEnd.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  var calEvents = (events.items || []).filter(function(ev) {
    return ev.start && ev.start.dateTime; // excluir eventos de día completo
  });

  var busySlots = [];

  BASE_SLOTS.forEach(function(slot) {
    var slotStart = new Date(date + "T" + slot + ":00-05:00");
    var slotEnd   = new Date(slotStart.getTime() + 90 * 60 * 1000); // ventana de 1.5h

    var isBusy = calEvents.some(function(ev) {
      var evStart = new Date(ev.start.dateTime);
      var evEnd   = new Date(ev.end.dateTime);
      // Solapamiento: el evento empieza antes de que termine el slot Y termina después de que empieza
      return evStart < slotEnd && evEnd > slotStart;
    });

    if (isBusy) busySlots.push(slot);
  });

  return { busySlots: busySlots };
}

// ── createBooking ─────────────────────────────────────────────────────────────
function createBooking(data) {
  var service = data.service;
  var date    = data.date;
  var time    = data.time;
  var name    = data.name;
  var email   = data.email;
  var idea    = data.idea || "Sin detalles adicionales";

  var serviceLabels = {
    tattoo_session:      "Sesión de Tatuaje",
    design_consultation: "Consulta de Diseño",
    flash_day:           "Flash del Día",
  };

  var label       = serviceLabels[service] || service;
  var durationMin = SERVICE_DURATION[service] || 60;

  var startDT = new Date(date + "T" + time + ":00-05:00");
  var endDT   = new Date(startDT.getTime() + durationMin * 60 * 1000);

  var event = {
    summary:     "[PENDIENTE] " + label + " \u2014 " + name,
    description: "Nombre: "  + name  + "\n" +
                 "Email: "   + email + "\n" +
                 "Idea: "    + idea,
    start: { dateTime: startDT.toISOString(), timeZone: TIMEZONE },
    end:   { dateTime: endDT.toISOString(),   timeZone: TIMEZONE },
    colorId: "5", // amarillo = pendiente de confirmar
    status: "tentative",
  };

  var created = Calendar.Events.insert(event, CALENDAR_ID);
  return { ok: true, eventId: created.id };
}
