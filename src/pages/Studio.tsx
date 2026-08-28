export default function Studio() {
  return (
    <div style={{ paddingTop: "72px" }}>
      {/* Full-bleed image */}
      <div
        style={{
          height: "60vh",
          minHeight: "400px",
          backgroundColor: "#13111A",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src="/studio/estudio.jpeg"
          alt="Studio interior"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(9,8,14,0.9) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "clamp(1.5rem, 5vw, 4rem)",
          }}
        >
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ABA7E3", margin: 0, marginBottom: "0.75rem" }}>
            Estudio Osiris Tattoo
          </p>
          <h1
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "#EDE8DF",
              margin: 0,
              lineHeight: 1,
            }}
          >
            Robledo, <em style={{ fontStyle: "italic" }}>Medellín</em>
          </h1>
        </div>
      </div>

      {/* Info grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid #221F2C",
        }}
      >
        {/* Left — details */}
        <div
          style={{
            padding: "clamp(3rem, 6vw, 5.5rem)",
            borderRight: "1px solid #221F2C",
          }}
        >
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ABA7E3", margin: 0, marginBottom: "2.5rem" }}>
            Información
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { label: "Dirección", value: "cll 64CA # 115-07" },
              { label: "Citas", value: "Solo con agenda previa" },
              { label: "Horario", value: "Lunes a Sábado · 10:00 – 19:00" },
              { label: "Contacto", value: "+57 300 903 51 53" },
            ].map(({ label, value }, i, arr) => (
              <div
                key={label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr",
                  gap: "2rem",
                  paddingBlock: "1.5rem",
                  borderBottom: i < arr.length - 1 ? "1px solid #221F2C" : "none",
                  alignItems: "baseline",
                }}
              >
                <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6A6575" }}>
                  {label}
                </span>
                <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1rem", color: "#EDE8DF", fontWeight: 300 }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "3rem" }}>
            <a
              href="https://www.google.com/maps/place//@6.2852151,-75.6080045,259a,35y,0.64t/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI2MDgyNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="link-arrow"
              style={{ color: "#EDE8DF" }}
            >
              <span style={{ color: "#ABA7E3" }}>→</span> Open in Maps ↗
            </a>
          </div>
        </div>

        {/* Right — map placeholder + second image */}
        <div style={{ backgroundColor: "#13111A", overflow: "hidden", position: "relative" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Metro_de_Medell%C3%ADn%2C_Colombia.jpg?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=original"
            alt="Medellín"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "1px solid #ABA7E3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#ABA7E3", fontSize: "1.25rem" }}>⊕</span>
            </div>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.6875rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#ABA7E3", margin: 0 }}>
              Medellín, Colombia
            </p>
          </div>
        </div>
      </div>

      {/* Secondary images */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1.5rem",
          padding: "clamp(1.5rem, 3vw, 3rem)",
        }}
      >
        <div style={{ backgroundColor: "#13111A", aspectRatio: "16/9", overflow: "hidden" }}>
          <img
            src="/studio/mesa.jpg"
            alt="Studio workspace"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ backgroundColor: "#13111A", aspectRatio: "4/3", overflow: "hidden" }}>
          <img
            src="studio/yo.jpeg"
            alt="Studio detail"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
