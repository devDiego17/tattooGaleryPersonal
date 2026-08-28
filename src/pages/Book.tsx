import { useState, useEffect, useCallback } from "react";
import type { ServiceType, BookingData, TimeSlot } from "../types/booking";
import {
  fetchAvailability,
  bookSession,
  buildWhatsAppUrl,
  SERVICE_LABELS,
} from "../lib/calendarApi";

// ── Constants ─────────────────────────────────────────────────────────────────

/** All possible time slots offered each working day */
const BASE_SLOTS: string[] = [
  "10:00", "11:30", "13:00", "14:30", "16:00", "17:30",
];

/**
 * How many consecutive 1.5-hour slots each service occupies.
 * Used to mark following slots as unavailable when the selected service is long.
 */
const SERVICE_SLOT_COUNT: Record<ServiceType, number> = {
  tattoo_session: 3,       // ≥ 3 h → occupies 3 slots
  design_consultation: 1,  // 1 h → occupies 1 slot
  flash_day: 2,            // 1–2 h → occupies 2 slots
};

const BOOKING_TYPES: {
  id: ServiceType;
  label: string;
  desc: string;
  duration: string;
}[] = [
    {
      id: "tattoo_session",
      label: "Sesión de Tatuaje",
      desc: "Diseño personalizado, sesión completa",
      duration: "3 – 6 h",
    },
    {
      id: "design_consultation",
      label: "Consulta de Diseño",
      desc: "Revisamos ideas, referencias y presupuesto",
      duration: "1 h",
    },
    {
      id: "flash_day",
      label: "Flash del Día",
      desc: "Diseños listos para tatuar sin espera",
      duration: "1 – 2 h",
    },
  ];

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const DAYS_SHORT = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function toKey(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstWeekday(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * Given a set of busy slot strings from the API and the selected service,
 * computes the final TimeSlot[] array, marking slots that are either
 * directly busy or would be blocked by the service's duration.
 */
function computeSlots(busySlots: string[], service: ServiceType): TimeSlot[] {
  const busySet = new Set(busySlots);
  const neededSlots = SERVICE_SLOT_COUNT[service];

  return BASE_SLOTS.map((slotTime, idx) => {
    // Check if this slot or any of the following (neededSlots-1) are busy
    let blocked = false;
    for (let k = 0; k < neededSlots; k++) {
      const futureSlot = BASE_SLOTS[idx + k];
      if (!futureSlot || busySet.has(futureSlot)) {
        blocked = true;
        break;
      }
    }
    return { time: slotTime, available: !blocked };
  });
}

// ── Design tokens ─────────────────────────────────────────────────────────────

const C = {
  bg: "#09080E", card: "#0E0D16", border: "#221F2C", borderLight: "#2E2A3A",
  fg: "#EDE8DF", muted: "#6A6575", lavender: "#ABA7E3", purple: "#4525A2",
  bookedText: "#3A3548", booked: "#1C1A22",
  error: "#E06B75",
} as const;

const labelStyle: React.CSSProperties = {
  fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase",
  color: C.muted, fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500,
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function Book() {
  const today = new Date();

  // Step state
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 — Service selection
  const [bookingType, setBookingType] = useState<ServiceType>("tattoo_session");

  // Step 2 — Calendar & time slot
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Availability fetch state
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  // Step 3 — Contact form
  const [form, setForm] = useState({ name: "", email: "", idea: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstWeekday = getFirstWeekday(viewYear, viewMonth);

  // ── Fetch availability when selected date changes ─────────────────────────
  const loadSlots = useCallback(
    async (date: string) => {
      setSlotsLoading(true);
      setSlotsError(null);
      setSlots([]);
      try {
        const busySlots = await fetchAvailability(date);
        setSlots(computeSlots(busySlots, bookingType));
      } catch (err) {
        setSlotsError(
          err instanceof Error ? err.message : "Error al cargar disponibilidad"
        );
      } finally {
        setSlotsLoading(false);
      }
    },
    [bookingType]
  );

  useEffect(() => {
    if (selected) {
      setSelectedSlot(null);
      void loadSlots(selected);
    }
  }, [selected, loadSlots]);

  // Re-compute slots (without re-fetching) when service changes on step 2
  useEffect(() => {
    if (slots.length > 0) {
      // We still have the raw busy slots — but we didn't store them separately.
      // Trigger a fresh fetch if date is already selected and we're on step 2.
      if (selected && step === 2) {
        void loadSlots(selected);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingType]);

  // ── Calendar navigation ───────────────────────────────────────────────────
  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelected(null); setSelectedSlot(null); setSlots([]);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelected(null); setSelectedSlot(null); setSlots([]);
  };

  const handleDayClick = (day: number) => {
    const key = toKey(viewYear, viewMonth, day);
    const isPast = new Date(viewYear, viewMonth, day) <
      new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isSunday = new Date(viewYear, viewMonth, day).getDay() === 0;
    if (isPast || isSunday) return;
    setSelected(key);
  };

  // ── Form submit → POST → WhatsApp redirect ────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !selectedSlot) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const bookingData: BookingData = {
      service: bookingType,
      date: selected,
      time: selectedSlot,
      name: form.name.trim(),
      email: form.email.trim(),
      idea: form.idea.trim() || undefined,
    };

    try {
      const result = await bookSession(bookingData);

      if (!result.ok) {
        throw new Error(result.error ?? "El servidor rechazó la solicitud");
      }

      // Success — mark as submitted first, then open WhatsApp
      setSubmitted(true);
      const waUrl = buildWhatsAppUrl(bookingData);
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Error inesperado. Inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Reset flow ────────────────────────────────────────────────────────────
  const resetFlow = () => {
    setSubmitted(false);
    setStep(1);
    setSelected(null);
    setSelectedSlot(null);
    setSlots([]);
    setForm({ name: "", email: "", idea: "" });
    setSubmitError(null);
  };

  // ── Confirmation screen ───────────────────────────────────────────────────
  if (submitted && selected && selectedSlot) {
    const [y, m, d] = selected.split("-");
    const displayDate = `${d}/${m}/${y}`;
    const serviceLabel = SERVICE_LABELS[bookingType];

    return (
      <div style={{ minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            border: `1px solid ${C.lavender}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 2rem", fontSize: "1.5rem", color: C.lavender,
          }}>
            ✓
          </div>
          <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, color: C.fg, marginBottom: "1rem" }}>
            Solicitud Enviada
          </h1>
          <p style={{ color: C.muted, lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Gracias, <strong style={{ color: C.fg }}>{form.name}</strong>. Revisaré tu solicitud
            y te confirmaré por WhatsApp en las próximas 24 horas.
          </p>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "4px", padding: "1.5rem", marginBottom: "2.5rem", textAlign: "left" }}>
            <p style={labelStyle}>Resumen</p>
            <p style={{ color: C.fg, marginTop: "0.75rem", fontFamily: "'Fraunces', Georgia, serif", fontSize: "1rem", fontWeight: 300 }}>
              {serviceLabel}
            </p>
            <p style={{ color: C.muted, fontSize: "0.8rem", marginTop: "0.25rem" }}>
              {displayDate} · {selectedSlot}
            </p>
          </div>
          <button
            onClick={resetFlow}
            style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, background: "none", border: "none", cursor: "pointer" }}
          >
            ← Hacer otra solicitud
          </button>
        </div>
      </div>
    );
  }

  // ── Main 3-step flow ──────────────────────────────────────────────────────
  return (
    <div style={{ paddingTop: "64px", minHeight: "100svh" }}>

      {/* Header */}
      <section style={{ padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem)", borderBottom: `1px solid ${C.border}` }}>
        <p style={labelStyle}>Agendar</p>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 300, color: C.fg, margin: "0.75rem 0 0", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
          Reserva tu sesión
        </h1>
        <p style={{ color: C.muted, marginTop: "1rem", maxWidth: "480px", lineHeight: 1.7, fontSize: "0.9rem" }}>
          Selecciona el tipo de servicio, elige una fecha disponible y completa tu solicitud. Te confirmaré en 24 h.
        </p>
      </section>

      {/* Step indicator */}
      <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
        {(["Servicio", "Fecha & Hora", "Datos"] as const).map((label, i) => {
          const s = (i + 1) as 1 | 2 | 3;
          const active = step === s;
          const done = step > s;
          return (
            <button key={label} onClick={() => { if (done) setStep(s); }}
              style={{
                background: "none", border: "none", padding: "1.25rem 0", marginRight: "2rem",
                cursor: done ? "pointer" : "default", fontSize: "0.6875rem", letterSpacing: "0.12em",
                textTransform: "uppercase", fontWeight: 500, fontFamily: "'Instrument Sans', sans-serif",
                color: active ? C.fg : done ? C.lavender : C.muted,
                borderBottom: active ? `1px solid ${C.lavender}` : "1px solid transparent",
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              {i + 1}. {label}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)" }}>

        {/* ── STEP 1 — Tipo de servicio ── */}
        {step === 1 && (
          <div style={{ maxWidth: "720px" }}>
            <p style={{ ...labelStyle, marginBottom: "1.5rem" }}>Tipo de servicio</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {BOOKING_TYPES.map(bt => {
                const active = bookingType === bt.id;
                return (
                  <button key={bt.id} onClick={() => setBookingType(bt.id)}
                    style={{
                      background: active ? "rgba(171,167,227,0.06)" : C.card,
                      border: `1px solid ${active ? C.lavender : C.border}`,
                      borderRadius: "4px", padding: "1.5rem 2rem", cursor: "pointer",
                      textAlign: "left", display: "flex", alignItems: "center",
                      justifyContent: "space-between", gap: "1rem",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                  >
                    <div>
                      <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.25rem", fontWeight: 300, color: C.fg, margin: 0 }}>
                        {bt.label}
                      </p>
                      <p style={{ fontSize: "0.8rem", color: C.muted, margin: "0.25rem 0 0" }}>
                        {bt.desc}
                      </p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ ...labelStyle, color: active ? C.lavender : C.muted }}>{bt.duration}</p>
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%",
                        border: `1px solid ${active ? C.lavender : C.muted}`,
                        background: active ? C.lavender : "transparent",
                        marginTop: "0.5rem", marginLeft: "auto",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s",
                      }}>
                        {active && <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.bg }} />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setStep(2)}
                style={{ padding: "0.75rem 2rem", background: C.lavender, color: C.bg, border: "none", borderRadius: "2px", fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", fontFamily: "'Instrument Sans', sans-serif" }}
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2 — Fecha & Hora ── */}
        {step === 2 && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: "3rem", alignItems: "start", maxWidth: "900px" }}>

              {/* Calendar */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                  <button onClick={prevMonth}
                    style={{ background: "none", border: `1px solid ${C.border}`, color: C.muted, width: 36, height: 36, borderRadius: "2px", cursor: "pointer", fontSize: "1rem" }}
                  >
                    &#8249;
                  </button>
                  <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.25rem", fontWeight: 300, color: C.fg }}>
                    {MONTHS[viewMonth]} {viewYear}
                  </span>
                  <button onClick={nextMonth}
                    style={{ background: "none", border: `1px solid ${C.border}`, color: C.muted, width: 36, height: 36, borderRadius: "2px", cursor: "pointer", fontSize: "1rem" }}
                  >
                    &#8250;
                  </button>
                </div>

                {/* Day headers */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "0.5rem" }}>
                  {DAYS_SHORT.map(d => (
                    <div key={d} style={{ textAlign: "center", ...labelStyle, padding: "0.25rem 0" }}>{d}</div>
                  ))}
                </div>

                {/* Day cells */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
                  {Array.from({ length: firstWeekday }).map((_, i) => <div key={`e-${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const key = toKey(viewYear, viewMonth, day);
                    const isPast = new Date(viewYear, viewMonth, day) <
                      new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    const isSunday = new Date(viewYear, viewMonth, day).getDay() === 0;
                    const isSelected = selected === key;
                    const disabled = isPast || isSunday;

                    let bg: string = "transparent";
                    let color: string = C.fg;
                    let border: string = "1px solid transparent";
                    let cursor: string = "pointer";

                    if (disabled) { color = C.bookedText; cursor = "default"; }
                    else if (isSelected) { bg = C.lavender; color = C.bg; border = `1px solid ${C.lavender}`; }

                    return (
                      <button key={key} onClick={() => !disabled && handleDayClick(day)}
                        style={{
                          aspectRatio: "1", display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "center",
                          background: bg, color, border, borderRadius: "3px",
                          cursor, fontSize: "0.8rem", fontWeight: 400,
                          fontFamily: "'Instrument Sans', sans-serif",
                          transition: "background 0.15s, border-color 0.15s",
                        }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots panel */}
              <div>
                {!selected ? (
                  <div style={{ padding: "2rem 0", color: C.muted, fontSize: "0.8rem", lineHeight: 1.6 }}>
                    Selecciona un día para ver los horarios disponibles.
                  </div>
                ) : slotsLoading ? (
                  <div style={{ padding: "2rem 0" }}>
                    <p style={{ ...labelStyle, marginBottom: "1rem" }}>
                      {selected.split("-").reverse().join("/")}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {BASE_SLOTS.map(t => (
                        <div key={t} style={{
                          padding: "0.65rem 1rem", borderRadius: "3px",
                          background: C.card, border: `1px solid ${C.border}`,
                          fontSize: "0.8125rem", color: C.bookedText,
                          fontFamily: "'Instrument Sans', sans-serif",
                          animation: "pulse 1.4s ease-in-out infinite",
                        }}>
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : slotsError ? (
                  <div style={{ padding: "2rem 0" }}>
                    <p style={{ ...labelStyle, marginBottom: "0.75rem", color: C.error }}>
                      Error al cargar
                    </p>
                    <p style={{ color: C.muted, fontSize: "0.8rem", marginBottom: "1rem", lineHeight: 1.5 }}>
                      {slotsError}
                    </p>
                    <button
                      onClick={() => selected && void loadSlots(selected)}
                      style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.lavender, background: "none", border: `1px solid ${C.border}`, padding: "0.5rem 1rem", borderRadius: "2px", cursor: "pointer" }}
                    >
                      Reintentar
                    </button>
                  </div>
                ) : (
                  <>
                    <p style={{ ...labelStyle, marginBottom: "1rem" }}>
                      {selected.split("-").reverse().join("/")}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {slots.map(slot => {
                        const isChosen = selectedSlot === slot.time;
                        return (
                          <button key={slot.time}
                            onClick={() => slot.available && setSelectedSlot(slot.time)}
                            style={{
                              padding: "0.65rem 1rem",
                              background: isChosen ? C.lavender : slot.available ? C.card : "transparent",
                              border: `1px solid ${isChosen ? C.lavender : slot.available ? C.border : C.booked}`,
                              borderRadius: "3px",
                              color: isChosen ? C.bg : slot.available ? C.fg : C.bookedText,
                              fontSize: "0.8125rem", fontFamily: "'Instrument Sans', sans-serif",
                              cursor: slot.available ? "pointer" : "default",
                              textDecoration: slot.available ? "none" : "line-through",
                              transition: "all 0.15s", textAlign: "left",
                            }}
                          >
                            {slot.time}
                            {!slot.available && (
                              <span style={{ fontSize: "0.65rem", marginLeft: "0.5rem", color: C.bookedText }}>
                                Ocupado
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Step 2 navigation */}
            <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "space-between", maxWidth: "900px" }}>
              <button onClick={() => setStep(1)}
                style={{ background: "none", border: `1px solid ${C.border}`, color: C.muted, padding: "0.75rem 1.5rem", borderRadius: "2px", fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Instrument Sans', sans-serif" }}
              >
                ← Volver
              </button>
              <button
                onClick={() => { if (selected && selectedSlot) setStep(3); }}
                disabled={!selected || !selectedSlot}
                style={{
                  padding: "0.75rem 2rem",
                  background: selected && selectedSlot ? C.lavender : C.booked,
                  color: selected && selectedSlot ? C.bg : C.bookedText,
                  border: "none", borderRadius: "2px", fontSize: "0.6875rem",
                  letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600,
                  cursor: selected && selectedSlot ? "pointer" : "default",
                  fontFamily: "'Instrument Sans', sans-serif",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                Continuar →
              </button>
            </div>
          </>
        )}

        {/* ── STEP 3 — Datos de contacto ── */}
        {step === 3 && (
          <div style={{ maxWidth: "560px" }}>

            {/* Selection summary */}
            <div style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: "4px",
              padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "2rem", gap: "1rem",
            }}>
              <div>
                <p style={labelStyle}>Tu selección</p>
                <p style={{ color: C.fg, margin: "0.4rem 0 0", fontFamily: "'Fraunces', Georgia, serif", fontSize: "1rem", fontWeight: 300 }}>
                  {SERVICE_LABELS[bookingType]}
                </p>
                <p style={{ color: C.muted, fontSize: "0.8rem", margin: "0.2rem 0 0" }}>
                  {selected?.split("-").reverse().join("/")} · {selectedSlot}
                </p>
              </div>
              <button onClick={() => setStep(2)}
                style={{ background: "none", border: "none", color: C.muted, fontSize: "0.7rem", cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                Editar
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Name field */}
              <div>
                <label htmlFor="booking-name" style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}>
                  Nombre completo
                </label>
                <input
                  id="booking-name" type="text" required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Tu nombre"
                  disabled={isSubmitting}
                  style={{
                    width: "100%", padding: "0.75rem 1rem", boxSizing: "border-box",
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: "3px", color: C.fg,
                    fontSize: "0.875rem", fontFamily: "'Instrument Sans', sans-serif", outline: "none",
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = C.lavender)}
                  onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                />
              </div>

              {/* WhatsApp field */}
              <div>
                <label htmlFor="booking-email" style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}>
                  WhatsApp
                </label>
                <input
                  id="booking-email" type="tel" required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="+57 300 123 4567"
                  disabled={isSubmitting}
                  style={{
                    width: "100%", padding: "0.75rem 1rem", boxSizing: "border-box",
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: "3px", color: C.fg,
                    fontSize: "0.875rem", fontFamily: "'Instrument Sans', sans-serif", outline: "none",
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = C.lavender)}
                  onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                />
              </div>

              {/* Idea / notes */}
              <div>
                <label htmlFor="booking-idea" style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}>
                  Ideas / Referencias <span style={{ color: C.bookedText }}>(opcional)</span>
                </label>
                <textarea
                  id="booking-idea" rows={4}
                  value={form.idea}
                  onChange={e => setForm(f => ({ ...f, idea: e.target.value }))}
                  placeholder="Cuéntame sobre tu idea, zona del cuerpo, tamaño aproximado..."
                  disabled={isSubmitting}
                  style={{
                    width: "100%", padding: "0.75rem 1rem", boxSizing: "border-box",
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: "3px", color: C.fg,
                    fontSize: "0.875rem", fontFamily: "'Instrument Sans', sans-serif",
                    outline: "none", resize: "vertical",
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = C.lavender)}
                  onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                />
              </div>

              <p style={{ color: C.muted, fontSize: "0.75rem", lineHeight: 1.6 }}>
                Esta solicitud no confirma la reserva. Te enviaré confirmación por WhatsApp
                con los detalles finales y el depósito requerido.
              </p>

              {/* Server error feedback */}
              {submitError && (
                <p style={{ color: C.error, fontSize: "0.8rem", lineHeight: 1.5 }}>
                  ⚠ {submitError}
                </p>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button type="button" onClick={() => setStep(2)} disabled={isSubmitting}
                  style={{ background: "none", border: `1px solid ${C.border}`, color: C.muted, padding: "0.75rem 1.5rem", borderRadius: "2px", fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: isSubmitting ? "default" : "pointer", fontFamily: "'Instrument Sans', sans-serif", opacity: isSubmitting ? 0.5 : 1 }}
                >
                  ← Volver
                </button>
                <button type="submit" disabled={isSubmitting}
                  style={{
                    padding: "0.75rem 2rem",
                    background: isSubmitting ? C.booked : C.lavender,
                    color: isSubmitting ? C.bookedText : C.bg,
                    border: "none", borderRadius: "2px", fontSize: "0.6875rem",
                    letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600,
                    cursor: isSubmitting ? "default" : "pointer",
                    fontFamily: "'Instrument Sans', sans-serif",
                    transition: "background 0.2s, color 0.2s",
                    display: "flex", alignItems: "center", gap: "0.5rem",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span style={{
                        width: 12, height: 12, border: `2px solid ${C.bookedText}`,
                        borderTopColor: "transparent", borderRadius: "50%",
                        display: "inline-block", animation: "spin 0.7s linear infinite",
                      }} />
                      Enviando…
                    </>
                  ) : (
                    "Enviar solicitud"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Inline keyframe animations */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
