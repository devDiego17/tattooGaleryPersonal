// ── Booking Types ─────────────────────────────────────────────────────────────

/** Identifies each bookable service */
export type ServiceType =
  | "tattoo_session"
  | "design_consultation"
  | "flash_day";

/** A single time slot with its availability status */
export interface TimeSlot {
  time: string;       // "HH:MM"
  available: boolean;
}

/** Full data collected across the booking flow */
export interface BookingData {
  service: ServiceType | string;
  date: string;       // "YYYY-MM-DD"
  time?: string;      // Optional for legacy / full-day
  name: string;
  email: string;
  phone?: string;
  idea?: string;
}

/** Response from GET /availability */
export interface AvailabilityResponse {
  date?: string;
  isAvailable?: boolean;
  busyDates?: string[]; // ["2026-09-15", "2026-09-20"] for month queries
  busySlots?: string[]; // legacy compatibility
  error?: string;
}

/** Response from POST /book */
export interface BookResponse {
  ok: boolean;
  eventId?: string;
  error?: string;
}

