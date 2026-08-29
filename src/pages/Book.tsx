import React, { useState, useEffect, useCallback } from "react";
import { buildWhatsAppLink } from "../lib/Whatsapp.ts";

// --- Constantes y Configuración ---
const BASE_SLOTS = [
  "10:00", "11:30", "13:00", "14:30", "16:00", "17:30"
];

const C = {
  bg: "#0d0d0d",
  card: "#171717",
  border: "#262626",
  accent: "#e5e5e5",
  text: "#a3a3a3",
  textLight: "#f5f5f5",
  danger: "#ef4444",
  success: "#22c55e",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: C.text,
  marginBottom: "0.5rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  backgroundColor: "#000000",
  border: `1px solid ${C.border}`,
  borderRadius: "0.5rem",
  color: C.textLight,
  outline: "none",
  boxSizing: "border-box",
};

interface BookingComponentProps {
  bookingType: string; // e.g., 'tattoo_session' | 'consultation'
}

export const BookingComponent: React.FC<BookingComponentProps> = ({ bookingType }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Form states
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientIdea, setClientIdea] = useState("");

  // Status states
  const [slots, setSlots] = useState<string[]>([]);
  const [rawBusySlots, setRawBusySlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // --- Helpers Calendario ---
  const todayNormalized = new Date();
  todayNormalized.setHours(0, 0, 0, 0);

  const viewYear = currentDate.getFullYear();
  const viewMonth = currentDate.getMonth();

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();

  // --- Lógica de Slots ---
  const computeSlots = (busy: string[], type: string): string[] => {
    // Si la sesión toma múltiples slots (ej. 3 slots continuos para tattoo)
    const neededSlots = type === "tattoo_session" ? 3 : 1;

    return BASE_SLOTS.filter((_, idx) => {
      for (let i = 0; i < neededSlots; i++) {
        const checkSlot = BASE_SLOTS[idx + i];
        if (!checkSlot || busy.includes(checkSlot)) {
          return false;
        }
      }
      return true;
    });
  };

  const fetchAvailability = async (date: string, options?: { signal?: AbortSignal }): Promise<string[]> => {
    const res = await fetch(`${import.meta.env.VITE_APPS_SCRIPT_URL}?action=availability&date=${date}`, {
      signal: options?.signal,
    });
    const data = await res.json();

    // Tu Apps Script no devuelve `ok: true`, devuelve directamente { busySlots: [...] }
    if (data.error) throw new Error(data.error);
    return data.busySlots || [];
  };

  const loadSlots = useCallback(
    async (date: string, signal?: AbortSignal) => {
      setSlotsLoading(true);
      setSlotsError(null);
      setSlots([]);
      try {
        const busy = await fetchAvailability(date, { signal });
        setRawBusySlots(busy);
        setSlots(computeSlots(busy, bookingType));
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setSlotsError(err instanceof Error ? err.message : "Error al cargar disponibilidad");
        }
      } finally {
        setSlotsLoading(false);
      }
    },
    [bookingType]
  );

  useEffect(() => {
    if (!selectedDate) return;
    const controller = new AbortController();
    loadSlots(selectedDate, controller.signal);
    return () => controller.abort();
  }, [selectedDate, loadSlots]);

  const prevMonth = () => {
    setSelectedDate("");
    setSelectedTime("");
    setCurrentDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const nextMonth = () => {
    setSelectedDate("");
    setSelectedTime("");
    setCurrentDate(new Date(viewYear, viewMonth + 1, 1));
  };

  // --- Submit de la reserva ---
  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(import.meta.env.VITE_APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "book",
          service: bookingType,
          date: selectedDate,
          time: selectedTime,
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          idea: clientIdea,
        }),
      });

      const result = await response.json();

      if (result.ok) {
        // 1. Prepara el enlace con los datos del formulario
        const waUrl = buildWhatsAppLink({
          service: bookingType,
          date: selectedDate,
          time: selectedTime,
          name: clientName,
          email: clientEmail,
          idea: clientIdea,
        });

        // 2. Abre WhatsApp en una ventana nueva
        window.open(waUrl, "_blank");

        // 3. Notifica al usuario en la UI
        setSuccess(true);
      } else {
        setError(result.error || "No se pudo procesar la reserva.");
      }
    } catch (err) {
      setError("Error de red al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (

    //estilos de calendario de citas y formularios
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#08030d",
        paddingTop: "140px",
        paddingBottom: "80px",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {/* Tarjeta contenedora principal */}
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "#13091f",
          border: "1px solid #2d1847",
          borderRadius: "1.25rem",
          padding: "2rem",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "1.75rem",
            textAlign: "center",
            letterSpacing: "0.5px",
          }}
        >
          Reservar Agenda
        </h2>

        {/* Calendario */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.25rem",
            }}
          >
            <button
              type="button"
              onClick={prevMonth}
              style={{
                background: "transparent",
                border: "1px solid #2d1847",
                borderRadius: "0.5rem",
                padding: "0.35rem 0.75rem",
                color: "#e0aaff",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              &lt; Ant
            </button>
            <span style={{ fontWeight: 600, color: "#ffffff", textTransform: "capitalize", fontSize: "1rem" }}>
              {currentDate.toLocaleString("es-ES", { month: "long", year: "numeric" })}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              style={{
                background: "transparent",
                border: "1px solid #2d1847",
                borderRadius: "0.5rem",
                padding: "0.35rem 0.75rem",
                color: "#e0aaff",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              Sig &gt;
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.35rem", textAlign: "center" }}>
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
              <span key={d} style={{ fontSize: "0.75rem", fontWeight: 700, color: "#c77dff", padding: "0.25rem 0" }}>
                {d}
              </span>
            ))}

            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const cellDate = new Date(viewYear, viewMonth, day);
              cellDate.setHours(0, 0, 0, 0);

              const isPast = cellDate.getTime() < todayNormalized.getTime();
              const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isSelected = selectedDate === dateStr;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isPast}
                  onClick={() => {
                    setSelectedDate(dateStr);
                    setSelectedTime("");
                  }}
                  style={{
                    padding: "0.55rem 0",
                    borderRadius: "0.5rem",
                    border: isSelected ? "1px solid #e0aaff" : "1px solid transparent",
                    backgroundColor: isSelected ? "#9d4edd" : "transparent",
                    color: isSelected ? "#ffffff" : isPast ? "#3c2856" : "#ffffff",
                    fontWeight: isSelected ? "bold" : "normal",
                    cursor: isPast ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horarios Disponibles */}
        {selectedDate && (
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#e0aaff", marginBottom: "0.85rem" }}>
              Horarios disponibles
            </h3>
            {slotsLoading && <p style={{ color: "#e0aaff", fontSize: "0.875rem" }}>Cargando disponibilidad...</p>}
            {slotsError && <p style={{ color: "#ff5555", fontSize: "0.875rem" }}>{slotsError}</p>}
            {!slotsLoading && !slotsError && slots.length === 0 && (
              <p style={{ color: "#e0aaff", fontSize: "0.875rem" }}>No hay espacios libres para este día.</p>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem" }}>
              {slots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  style={{
                    padding: "0.6rem",
                    borderRadius: "0.5rem",
                    border: `1px solid ${selectedTime === time ? "#c77dff" : "#2d1847"}`,
                    backgroundColor: selectedTime === time ? "#9d4edd" : "transparent",
                    color: "#ffffff",
                    fontWeight: selectedTime === time ? 700 : 400,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Formulario de Confirmación */}
        {selectedTime && (
          <form onSubmit={handleConfirmBooking} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label htmlFor="booking-name" style={labelStyle}>
                Nombre Completo
              </label>
              <input
                id="booking-name"
                type="text"
                required
                style={inputStyle}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="booking-email" style={labelStyle}>
                Correo Electrónico
              </label>
              <input
                id="booking-email"
                type="email"
                required
                style={inputStyle}
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="booking-phone" style={labelStyle}>
                WhatsApp
              </label>
              <input
                id="booking-phone"
                type="tel"
                required
                style={inputStyle}
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="booking-idea" style={labelStyle}>
                Idea del Diseño / Detalles
              </label>
              <textarea
                id="booking-idea"
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
                value={clientIdea}
                onChange={(e) => setClientIdea(e.target.value)}
              />
            </div>

            {error && <p style={{ color: "#ff5555", fontSize: "0.875rem" }}>{error}</p>}
            {success && (
              <p style={{ color: "#50fa7b", fontSize: "0.875rem" }}>
                ¡Reserva registrada con éxito! Te estamos redirigiendo a WhatsApp...
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "0.85rem",
                borderRadius: "0.5rem",
                border: "none",
                backgroundColor: "#9d4edd",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: loading ? "wait" : "pointer",
                opacity: loading ? 0.7 : 1,
                boxShadow: "0 4px 14px rgba(157, 78, 221, 0.4)",
                transition: "all 0.2s ease",
                marginTop: "0.5rem",
              }}
            >
              {loading ? "Procesando..." : "Confirmar y Continuar en WhatsApp"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingComponent;