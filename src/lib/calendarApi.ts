import type {
  ServiceType,
  BookingData,
  AvailabilityResponse,
  BookResponse,
} from "../types/booking";

// ── Configuration ─────────────────────────────────────────────────────────────
// Set these in .env.local (never commit real values)
const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined;
const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ?? "573009035153";

// ── Service labels (used for WhatsApp message) ────────────────────────────────
export const SERVICE_LABELS: Record<ServiceType | string, string> = {
  tattoo_session: "Sesión de Tatuaje (Jornada Completa)",
  design_consultation: "Consulta de Diseño",
  flash_day: "Flash del Día",
};

// ── fetchAvailability ─────────────────────────────────────────────────────────
/**
 * Queries the Google Apps Script backend for availability.
 * Can query a specific date or a month range.
 */
export async function fetchAvailability(date: string): Promise<AvailabilityResponse> {
  if (!APPS_SCRIPT_URL) {
    console.warn(
      "[calendarApi] VITE_APPS_SCRIPT_URL not set — returning all dates available (dev mode)"
    );
    return { isAvailable: true, busyDates: [] };
  }

  const url = `${APPS_SCRIPT_URL}?action=availability&date=${encodeURIComponent(date)}`;
  const res = await fetch(url, { redirect: "follow" });

  if (!res.ok) {
    throw new Error(`Error al consultar disponibilidad (HTTP ${res.status})`);
  }

  const data: AvailabilityResponse = await res.json();

  if (data.error) {
    throw new Error(`Error del servidor: ${data.error}`);
  }

  return data;
}

// ── fetchMonthBusyDates ───────────────────────────────────────────────────────
/**
 * Queries the Google Apps Script backend for all busy dates in a given month (YYYY-MM).
 */
export async function fetchMonthBusyDates(yearMonth: string): Promise<string[]> {
  if (!APPS_SCRIPT_URL) {
    return [];
  }

  try {
    const url = `${APPS_SCRIPT_URL}?action=month_availability&month=${encodeURIComponent(yearMonth)}`;
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.busyDates || [];
  } catch (e) {
    console.warn("[calendarApi] Error fetching month availability:", e);
    return [];
  }
}

// ── bookSession ───────────────────────────────────────────────────────────────
/**
 * POSTs the booking data to the Google Apps Script backend.
 * The server creates a [PENDIENTE] full-day event in Google Calendar.
 * Returns { ok: true, eventId } on success.
 */
export async function bookSession(data: BookingData): Promise<BookResponse> {
  if (!APPS_SCRIPT_URL) {
    console.warn(
      "[calendarApi] VITE_APPS_SCRIPT_URL not set — simulating success (dev mode)"
    );
    return { ok: true, eventId: "mock-event-id" };
  }

  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    redirect: "follow",
    headers: { "Content-Type": "text/plain" }, // Apps Script requires text/plain for doPost
    body: JSON.stringify({ action: "book", ...data }),
  });

  if (!res.ok) {
    throw new Error(`Error al crear la reserva (HTTP ${res.status})`);
  }

  const result: BookResponse = await res.json();
  return result;
}

// ── buildWhatsAppUrl ──────────────────────────────────────────────────────────
/**
 * Builds the wa.me deep-link URL with a pre-filled message.
 */
export function buildWhatsAppUrl(data: BookingData): string {
  const serviceLabel = SERVICE_LABELS[data.service] || data.service || "Sesión de Tatuaje";

  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const [y, m, d] = data.date.split("-");
  const formattedDate = `${d}/${m}/${y}`;

  const message = `¡Hola! Acabo de enviar una solicitud de reserva desde la web:

📌 Servicio: ${serviceLabel}
📅 Fecha: ${formattedDate} (Día completo)
👤 Nombre: ${data.name}
📱 WhatsApp: ${data.phone || data.email}
💡 Idea/Detalles: ${data.idea?.trim() || "Sin detalles adicionales"}

Quedo atento para coordinar los detalles del diseño y el pago del depósito.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

