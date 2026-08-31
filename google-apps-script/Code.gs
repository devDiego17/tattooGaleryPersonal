// Google Apps Script — Code.gs
// ─────────────────────────────────────────────────────────────────────────────
// INSTRUCCIONES DE DEPLOY:
//
// 1. Ve a https://script.google.com → Abre tu proyecto existente
// 2. Reemplaza el código en Code.gs por este
// 3. Guarda (Ctrl+S)
// 4. Clic en "Implementar > Administrar implementaciones > Editar > Nueva versión"
// 5. Clic en Implementar
// ─────────────────────────────────────────────────────────────────────────────

var CALENDAR_ID = "primary"; // o el ID específico del calendario
var TIMEZONE = "America/Bogota"; // UTC-5

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

    // Disponibilidad por mes completo (para pintar el calendario con días ocupados)
    if (action === "month_availability") {
      var month = e.parameter.month; // "YYYY-MM"
      if (!month) return corsOutput({ error: "Parámetro 'month' requerido", busyDates: [] });
      return corsOutput(getMonthAvailability(month));
    }

    // Disponibilidad por día específico
    if (action === "availability") {
      var date = e.parameter.date; // "YYYY-MM-DD"
      if (!date) return corsOutput({ error: "Parámetro 'date' requerido", isAvailable: true, busyDates: [] });
      return corsOutput(getDayAvailability(date));
    }

    return corsOutput({ error: "Acción desconocida" });
  } catch (err) {
    return corsOutput({ error: err.message, isAvailable: false });
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

// ── getDayAvailability ────────────────────────────────────────────────────────
function getDayAvailability(date) {
  // Rango completo del día en Bogotá (UTC-5)
  var dayStart = new Date(date + "T00:00:00-05:00");
  var dayEnd   = new Date(date + "T23:59:59-05:00");

  var events = Calendar.Events.list(CALENDAR_ID, {
    timeMin: dayStart.toISOString(),
    timeMax: dayEnd.toISOString(),
    singleEvents: true,
  });

  var hasEvents = (events.items || []).some(function(ev) {
    return ev.status !== "cancelled";
  });

  return {
    date: date,
    isAvailable: !hasEvents,
    busy: hasEvents,
    busySlots: hasEvents ? ["ALL_DAY"] : []
  };
}

// ── getMonthAvailability ──────────────────────────────────────────────────────
function getMonthAvailability(yearMonth) {
  var parts = yearMonth.split("-");
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10); // 1-12

  var startStr = yearMonth + "-01T00:00:00-05:00";
  var lastDay = new Date(year, month, 0).getDate();
  var endStr = yearMonth + "-" + (lastDay < 10 ? "0" + lastDay : lastDay) + "T23:59:59-05:00";

  var events = Calendar.Events.list(CALENDAR_ID, {
    timeMin: new Date(startStr).toISOString(),
    timeMax: new Date(endStr).toISOString(),
    singleEvents: true,
  });

  var busyDatesSet = {};
  (events.items || []).forEach(function(ev) {
    if (ev.status === "cancelled") return;

    var start = ev.start.dateTime || ev.start.date;
    if (start) {
      var dateKey = start.substring(0, 10); // "YYYY-MM-DD"
      busyDatesSet[dateKey] = true;
    }
  });

  return {
    month: yearMonth,
    busyDates: Object.keys(busyDatesSet)
  };
}

// ── createBooking ─────────────────────────────────────────────────────────────
function createBooking(data) {
  var service = data.service || "tattoo_session";
  var date    = data.date; // "YYYY-MM-DD"
  var name    = data.name;
  var email   = data.email;
  var phone   = data.phone || "";
  var idea    = data.idea || "Sin detalles adicionales";

  if (!date) {
    return { ok: false, error: "La fecha es requerida" };
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

  var event = {
    summary:     "[PENDIENTE] " + label + " — " + name,
    description: "Servicio: " + label + "\n" +
                 "Cliente: "  + name  + "\n" +
                 "WhatsApp: " + (phone || email) + "\n" +
                 "Email: "    + email + "\n" +
                 "Idea: "     + idea  + "\n" +
                 "Modalidad: Jornada Completa (Día Exclusivo)",
    start: { dateTime: startDT.toISOString(), timeZone: TIMEZONE },
    end:   { dateTime: endDT.toISOString(),   timeZone: TIMEZONE },
    colorId: "5", // amarillo = pendiente de confirmar
    status: "tentative",
  };

  var created = Calendar.Events.insert(event, CALENDAR_ID);
  return { ok: true, eventId: created.id };
}
