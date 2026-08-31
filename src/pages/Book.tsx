import React, { useState, useEffect, useCallback } from "react";
import { buildWhatsAppLink } from "../lib/Whatsapp.ts";

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
  bookingType?: string; // e.g., 'tattoo_session' | 'consultation'
}

export const BookingComponent: React.FC<BookingComponentProps> = ({ bookingType = "tattoo_session" }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Form states
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientIdea, setClientIdea] = useState("");

  // Availability states
  const [busyDates, setBusyDates] = useState<string[]>([]);
  const [calendarLoading, setCalendarLoading] = useState(false);

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

  const monthKey = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`;

  // Consultar disponibilidad del mes completo desde Google Calendar / Apps Script
  const loadMonthAvailability = useCallback(async (yearMonth: string, signal?: AbortSignal) => {
    const appsScriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
    if (!appsScriptUrl) return;

    setCalendarLoading(true);
    try {
      const res = await fetch(`${appsScriptUrl}?action=month_availability&month=${yearMonth}`, { signal });
      if (!res.ok) throw new Error("Error al consultar disponibilidad");
      const data = await res.json();
      if (data.busyDates && Array.isArray(data.busyDates)) {
        setBusyDates(data.busyDates);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.warn("[Book] Error cargando disponibilidad del mes:", err);
      }
    } finally {
      setCalendarLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadMonthAvailability(monthKey, controller.signal);
    return () => controller.abort();
  }, [monthKey, loadMonthAvailability]);

  const prevMonth = () => {
    setSelectedDate("");
    setCurrentDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const nextMonth = () => {
    setSelectedDate("");
    setCurrentDate(new Date(viewYear, viewMonth + 1, 1));
  };

  // Formatear fecha para mostrar
  const formatSelectedDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    return dateObj.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // --- Submit de la reserva ---
  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      setError("Por favor selecciona un día disponible en el calendario.");
      return;
    }

    setLoading(true);
    setError(null);

    const appsScriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;

    try {
      let result = { ok: true, eventId: "mock-id" };

      if (appsScriptUrl) {
        const response = await fetch(appsScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            action: "book",
            service: bookingType,
            date: selectedDate,
            name: clientName,
            email: clientEmail,
            phone: clientPhone,
            idea: clientIdea,
          }),
        });

        result = await response.json();
      }

      if (result.ok) {
        // Bloquear el día localmente de inmediato
        setBusyDates((prev) => [...prev, selectedDate]);

        // 1. Prepara el enlace con los datos del formulario
        const waUrl = buildWhatsAppLink({
          service: bookingType,
          date: selectedDate,
          name: clientName,
          email: clientPhone || clientEmail,
          idea: clientIdea,
        });

        // 2. Abre WhatsApp en una ventana nueva
        window.open(waUrl, "_blank");

        // 3. Notifica al usuario en la UI
        setSuccess(true);
      } else {
        setError(result.error || "No se pudo procesar la reserva.");
        // Refrescar disponibilidad por si el día fue tomado
        loadMonthAvailability(monthKey);
      }
    } catch (err) {
      setError("Error de red al conectar con el servidor de reservas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // estilos de calendario de citas y formularios
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
          maxWidth: "480px",
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
            marginBottom: "0.5rem",
            textAlign: "center",
            letterSpacing: "0.5px",
          }}
        >
          Reservar Cita
        </h2>
        <p
          style={{
            fontSize: "0.8125rem",
            color: "#a677ca",
            textAlign: "center",
            marginBottom: "1.75rem",
          }}
        >
          Atención exclusiva: 1 cliente por día (Jornada completa)
        </p>

        {/* Calendario */}
        <div style={{ marginBottom: "1.75rem" }}>
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
              const isBusy = busyDates.includes(dateStr);
              const isSelected = selectedDate === dateStr;
              const isDisabled = isPast || isBusy;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    setSelectedDate(dateStr);
                    setError(null);
                  }}
                  title={isBusy ? "Día ocupado / No disponible" : isPast ? "Fecha pasada" : "Día disponible"}
                  style={{
                    padding: "0.55rem 0",
                    borderRadius: "0.5rem",
                    border: isSelected
                      ? "1px solid #e0aaff"
                      : isBusy
                      ? "1px solid #2d1847"
                      : "1px solid transparent",
                    backgroundColor: isSelected
                      ? "#9d4edd"
                      : isBusy
                      ? "rgba(45, 24, 71, 0.4)"
                      : "transparent",
                    color: isSelected
                      ? "#ffffff"
                      : isBusy
                      ? "#4a3560"
                      : isPast
                      ? "#3c2856"
                      : "#ffffff",
                    fontWeight: isSelected ? "bold" : "normal",
                    textDecoration: isBusy ? "line-through" : "none",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Leyenda de estados */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.25rem",
              marginTop: "1rem",
              fontSize: "0.75rem",
              color: "#a677ca",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ffffff" }} />
              <span>Disponible</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#9d4edd" }} />
              <span>Seleccionado</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#4a3560" }} />
              <span>Ocupado</span>
            </div>
          </div>
        </div>

        {/* Formulario directo al seleccionar fecha */}
        {selectedDate ? (
          <form onSubmit={handleConfirmBooking} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div
              style={{
                backgroundColor: "rgba(157, 78, 221, 0.15)",
                border: "1px solid #9d4edd",
                borderRadius: "0.5rem",
                padding: "0.75rem 1rem",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#e0aaff", display: "block", marginBottom: "0.25rem" }}>
                Fecha elegida
              </span>
              <strong style={{ fontSize: "0.95rem", color: "#ffffff", textTransform: "capitalize" }}>
                {formatSelectedDate(selectedDate)}
              </strong>
            </div>

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
                placeholder="Tu nombre y apellido"
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
                placeholder="ejemplo@correo.com"
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
                placeholder="+57 300 000 0000"
              />
            </div>

            <div>
              <label htmlFor="booking-idea" style={labelStyle}>
                Idea del Diseño / Zona del cuerpo / Tamaño
              </label>
              <textarea
                id="booking-idea"
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
                value={clientIdea}
                onChange={(e) => setClientIdea(e.target.value)}
                placeholder="Cuéntame sobre el estilo, tamaño aproximado y zona del cuerpo..."
              />
            </div>

            {error && (
              <div
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid #ef4444",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                  color: "#ff8080",
                  fontSize: "0.875rem",
                }}
              >
                {error}
              </div>
            )}

            {success && (
              <div
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                  border: "1px solid #22c55e",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                  color: "#50fa7b",
                  fontSize: "0.875rem",
                  textAlign: "center",
                }}
              >
                ¡Día reservado con éxito! Redirigiendo a WhatsApp para ultimar detalles...
              </div>
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
              {loading ? "Procesando reserva..." : "Confirmar Reserva y Continuar en WhatsApp"}
            </button>
          </form>
        ) : (
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6A6575",
              textAlign: "center",
              padding: "1rem 0",
              borderTop: "1px solid #2d1847",
            }}
          >
            Selecciona un día disponible en el calendario para continuar con tu reserva.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingComponent;