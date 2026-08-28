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

/** Full data collected across the 3-step booking flow */
export interface BookingData {
  service: ServiceType;
  date: string;       // "YYYY-MM-DD"
  time: string;       // "HH:MM"
  name: string;
  email: string;
  idea?: string;
}

/** Response from GET /availability */
export interface AvailabilityResponse {
  busySlots: string[]; // ["10:00", "13:00", ...]
  error?: string;
}

/** Response from POST /book */
export interface BookResponse {
  ok: boolean;
  eventId?: string;
  error?: string;
}
