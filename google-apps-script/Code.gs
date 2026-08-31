// Google Apps Script — Code.gs
// ─────────────────────────────────────────────────────────────────────────────
// INSTRUCCIONES DE INSTALACIÓN / ACTUALIZACIÓN:
//
// 1. Ve a https://script.google.com y abre tu proyecto.
// 2. Reemplaza TODO el código de Code.gs con este archivo.
// 3. Guarda los cambios (Ctrl + S).
// 4. IMPORTANTE PARA PUBLICAR:
//    - Clic en "Implementar" (arriba a la derecha) → "Administrar implementaciones"
//    - Clic en el icono de lápiz (Editar)
//    - En "Versión", selecciona "Nueva versión"
//    - Clic en "Implementar"
// ─────────────────────────────────────────────────────────────────────────────

var CALENDAR_ID = "primary"; // "primary" usa el calendario principal de tu cuenta
var TIMEZONE = "America/Bogota"; // UTC-5

function getCalendar() {
  if (CALENDAR_ID === "primary") {
    return CalendarApp.getDefaultCalendar();
  }
  return CalendarApp.getCalendarById(CALENDAR_ID) || CalendarApp.getDefaultCalendar();
}

// ── CORS helper ───────────────────────────────────────────────────────────────
function corsOutput(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── doGet — disponibilidad ────────────────────────────────────────────────────
function doGet(e) {
  try {
    var params = e ? e.parameter : {};
    var action = params.action;

    // 1. Disponibilidad de todo el mes
    if (action === "month_availability" || params.month) {
      var month = params.month; // "YYYY-MM"
      if (!month && params.date) {
        month = params.date.substring(0, 7);
      }
      return corsOutput(getMonthAvailability(month || "2026-09"));
    }

    // 2. Disponibilidad de un día específico
    if (action === "availability" || params.date) {
      var date = params.date; // "YYYY-MM-DD"
      if (!date) return corsOutput({ error: "Parámetro 'date' requerido", isAvailable: true, busyDates: [] });
      return corsOutput(getDayAvailability(date));
    }

    return corsOutput({ error: "Acción desconocida", isAvailable: true, busyDates: [] });
  } catch (err) {
    return corsOutput({ error: err.toString(), isAvailable: true, busyDates: [] });
  }
}

// ── doPost — crear reserva ────────────────────────────────────────────────────
function doPost(e) {
  try {
    var contents = e && e.postData ? e.postData.contents : "{}";
    var body = JSON.parse(contents);

    if (body.action === "book" || body.date) {
      return corsOutput(createBooking(body));
    }

    return corsOutput({ ok: false, error: "Acción desconocida" });
  } catch (err) {
    return corsOutput({ ok: false, error: err.toString() });
  }
}

// ── getDayAvailability ────────────────────────────────────────────────────────
function getDayAvailability(date) {
  var cal = getCalendar();
  
  // Rango del día completo en horario local
  var dayStart = new Date(date + "T00:00:00-05:00");
  var dayEnd   = new Date(date + "T23:59:59-05:00");

  var events = cal.getEvents(dayStart, dayEnd);
  var isBusy = events.length > 0;

  return {
    date: date,
    isAvailable: !isBusy,
    busy: isBusy,
    busySlots: isBusy ? ["ALL_DAY"] : [],
    eventsCount: events.length
  };
}

// ── getMonthAvailability ──────────────────────────────────────────────────────
function getMonthAvailability(yearMonth) {
  var cal = getCalendar();
  var parts = yearMonth.split("-");
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10); // 1-12

  var lastDay = new Date(year, month, 0).getDate();
  var start = new Date(yearMonth + "-01T00:00:00-05:00");
  var end   = new Date(yearMonth + "-" + (lastDay < 10 ? "0" + lastDay : lastDay) + "T23:59:59-05:00");

  var events = cal.getEvents(start, end);
  var busyDatesSet = {};

  events.forEach(function(ev) {
    var evStart = ev.getStartTime();
    // Formatear a YYYY-MM-DD en timezone Bogotá
    var dateStr = Utilities.formatDate(evStart, TIMEZONE, "yyyy-MM-dd");
    busyDatesSet[dateStr] = true;
  });

  return {
    month: yearMonth,
    busyDates: Object.keys(busyDatesSet)
  };
}

// ── createBooking ─────────────────────────────────────────────────────────────
function createBooking(data) {
  var cal = getCalendar();
  var service = data.service || "tattoo_session";
  var date    = data.date; // "YYYY-MM-DD"
  var name    = data.name || "Cliente";
  var email   = data.email || "";
  var phone   = data.phone || "";
  var idea    = data.idea || "Sin detalles adicionales";

  if (!date) {
    return { ok: false, error: "La fecha es requerida." };
  }

  // VALIDACIÓN DE SEGURIDAD: Verificar que el día sigue libre antes de reservar
  var dayCheck = getDayAvailability(date);
  if (!dayCheck.isAvailable) {
    return { ok: false, error: "Lo sentimos, esta fecha ya ha sido reservada o no está disponible." };
  }

  var serviceLabels = {
    tattoo_session:      "Sesión de Tatuaje (Jornada Completa)",
    design_consultation: "Consulta de Diseño",
    flash_day:           "Flash del Día",
  };

  var label = serviceLabels[service] || service;

  // Jornada completa del día (10:00 AM a 6:00 PM) en Bogotá (UTC-5)
  var startDT = new Date(date + "T10:00:00-05:00");
  var endDT   = new Date(date + "T18:00:00-05:00");

  var title = "[PENDIENTE] " + label + " — " + name;
  var description = "Servicio: " + label + "\n" +
                    "Cliente: "  + name  + "\n" +
                    "WhatsApp: " + (phone || email) + "\n" +
                    "Email: "    + email + "\n" +
                    "Idea / Detalles: " + idea + "\n\n" +
                    "Modalidad: Jornada Completa (Día Exclusivo)";

  var event = cal.createEvent(title, startDT, endDT, {
    description: description
  });

  try {
    event.setColor(CalendarApp.EventColor.YELLOW);
  } catch (e) {
    // Ignorar si el color no está soportado en este entorno
  }

  return { ok: true, eventId: event.getId() };
}
