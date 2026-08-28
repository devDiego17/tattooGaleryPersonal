import { useState } from "react";

const contactTypes = ["Tattoos", "Projects", "Collaborations", "General"];

export default function Contact() {
  const [type, setType] = useState("Tattoos");
  const [form, setForm] = useState({ name: "", whatsapp: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const text = `Hola Diego, soy ${form.name}.
Motivo: ${type}
Asunto: ${form.subject}

Mensaje:
${form.message}

Mi número: ${form.whatsapp}`;

    const url = `https://wa.me/573009035153?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");

    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", whatsapp: "", subject: "", message: "" });
  };

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    fontFamily: "'Instrument Sans', sans-serif",
    fontSize: "0.9375rem",
    color: "#EDE8DF",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid #60188aff",
    padding: "1rem 0",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Instrument Sans', sans-serif",
    fontSize: "0.5625rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#6A6575",
    display: "block",
    marginBottom: "0.25rem",
  };

  return (
    <div style={{ paddingTop: "72px" }}>
      {/* Header */}
      <div
        style={{
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          paddingTop: "4rem",
          paddingBottom: "5rem",
          borderBottom: "1px solid #221F2C",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "end",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "#EDE8DF",
              margin: 0,
              lineHeight: 0.9,
            }}
          >
            Let's
            <br />
            <em style={{ fontStyle: "italic" }}>Talk</em>
          </h1>
        </div>
        <div>
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.9375rem", lineHeight: 1.75, color: "#6A6575", margin: 0, maxWidth: "46ch" }}>
            Para tatuajes, proyectos, colaboraciones o cualquier consulta. Cada mensaje se lee y se responde personalmente.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a 
              href="https://wa.me/573009035153" 
              target="_blank" 
              rel="noreferrer" 
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1.5rem",
                backgroundColor: "#25D366",
                color: "#09080E",
                borderRadius: "4px",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "transform 0.2s, opacity 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
            
            <a 
              href="https://www.instagram.com/diegops.ink/" 
              target="_blank" 
              rel="noreferrer" 
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                color: "#EDE8DF",
                borderRadius: "4px",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "transform 0.2s, opacity 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Form */}
      <div
        style={{
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          paddingBlock: "clamp(3rem, 6vw, 6rem)",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "6rem",
          alignItems: "start",
        }}
      >
        {/* Contact type selector */}
        <div>
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ABA7E3", margin: 0, marginBottom: "1.5rem" }}>
            Motivo
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {contactTypes.map((t, i) => (
              <div key={t}>
                <button
                  onClick={() => setType(t)}
                  style={{
                    width: "100%",
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                    fontWeight: 300,
                    color: type === t ? "#EDE8DF" : "#3A3645",
                    background: "none",
                    border: "none",
                    padding: "1rem 0",
                    cursor: "pointer",
                    textAlign: "left",
                    letterSpacing: "-0.01em",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  {type === t && (
                    <span style={{ width: "16px", height: "1px", backgroundColor: "#ABA7E3", flexShrink: 0 }} />
                  )}
                  {t}
                </button>
                {i < contactTypes.length - 1 && (
                  <div style={{ height: "1px", backgroundColor: "#221F2C" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 3rem", marginBottom: "0" }}>
            <div style={{ marginBottom: "2.5rem" }}>
              <label style={labelStyle}>Nombre</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Tu nombre"
                style={{ ...fieldStyle, "::placeholder": { color: "#3A3645" } } as React.CSSProperties}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = "#ABA7E3"; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = "#221F2C"; }}
              />
            </div>
            <div style={{ marginBottom: "2.5rem" }}>
              <label style={labelStyle}>WhatsApp / Teléfono</label>
              <input
                type="tel"
                required
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                placeholder="+57 300 000 0000"
                style={{ ...fieldStyle, "::placeholder": { color: "#3A3645" } } as React.CSSProperties}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = "#ABA7E3"; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = "#221F2C"; }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "2.5rem" }}>
            <label style={labelStyle}>Asunto</label>
            <input
              type="text"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder={`${type} — describe brevemente tu proyecto`}
              style={fieldStyle}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = "#ABA7E3"; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = "#221F2C"; }}
            />
          </div>

          <div style={{ marginBottom: "3.5rem" }}>
            <label style={labelStyle}>Mensaje</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Cuéntame sobre tu proyecto, idea o consulta."
              style={{
                ...fieldStyle,
                resize: "none",
                display: "block",
              }}
              onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderBottomColor = "#ABA7E3"; }}
              onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderBottomColor = "#221F2C"; }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <button
              type="submit"
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#09080E",
                backgroundColor: sent ? "#A677CA" : "#EDE8DF",
                border: "none",
                padding: "1.125rem 2.5rem",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              {sent ? "Enviado ✓" : "Send →"}
            </button>
            {sent && (
              <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.8125rem", color: "#6A6575" }}>
                Respondo en menos de 48 horas.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
