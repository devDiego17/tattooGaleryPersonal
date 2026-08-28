export default function About() {
  const timeline = [
    {
      year: "2017",
      title: "Comienzos",
      text: "Empiezo a explorar el mundo del arte, y me enamoro del mismo, inicialmente con el dibujo",
      image: "/about/2017.png",
    },
    {
      year: "2020",
      title: "Exploración",
      text: "Blackwork, fine line, dotwork. Cada técnica como un idioma nuevo. Los proyectos empezaron a cruzar disciplinas: ilustración, diseño gráfico, pintura.",
      image: "/about/2021.jpg",
    },
    {
      year: "2023",
      title: "Nueva etapa",
      text: "Apertura del estudio propio en Medellín. El espacio como herramienta: un lugar para hacer, investigar y recibir personas que confían su piel.",
      image: "/about/2023.jpeg",
    },
    {
      year: "2026",
      title: "Actualidad",
      text: "Proyectos editoriales, colaboraciones, colecciones de flash y obra propia. El tatuaje como punto de partida, no como límite.",
      image: "/about/muerte.jpeg",
    },
  ];

  const disciplines = ["Tatuaje", "Ilustración", "Diseño Gráfico", "Pintura", "Publicaciones", "Fotografía"];
  const influences = ["Arte precolombino", "Grabado japonés", "Cultura visual colombiana", "Diseño editorial", "Botánica", "Anatomía"];

  return (
    <div style={{ paddingTop: "72px" }}>
      {/* Hero */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "70vh",
          borderBottom: "1px solid #221F2C",
        }}
      >
        <div
          style={{
            padding: "clamp(3rem, 6vw, 6rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ABA7E3", margin: 0, marginBottom: "2.5rem" }}>
            Sobre mí
          </p>
          <h1
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "#EDE8DF",
              margin: 0,
              marginBottom: "2rem",
              lineHeight: 0.92,
            }}
          >
            Diego
            <br />
            <em style={{ fontStyle: "italic" }}>Patiño</em>
          </h1>
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
              lineHeight: 1.75,
              color: "#6A6575",
              maxWidth: "46ch",
            }}
          >
            Artista y tatuador multidisciplinario radicado en Medellín. El trabajo cruza el tatuaje, la ilustración, el diseño y la pintura con una misma pregunta de fondo: qué puede hacer una imagen.
          </p>
        </div>

        <div style={{ backgroundColor: "#13111A", overflow: "hidden" }}>
          <img
            src="/rostro.jpg"
            alt="Diego Patiño"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </div>

      {/* Disciplines + Influences */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid #221F2C",
        }}
      >
        {[
          { label: "Disciplinas", items: disciplines },
          { label: "Influencias", items: influences },
        ].map(({ label, items }, i) => (
          <div
            key={label}
            style={{
              padding: "clamp(2.5rem, 5vw, 5rem)",
              borderRight: i === 0 ? "1px solid #221F2C" : "none",
            }}
          >
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ABA7E3", margin: 0, marginBottom: "2rem" }}>
              {label}
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {items.map((item) => (
                <li
                  key={item}
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                    fontWeight: 300,
                    color: "#EDE8DF",
                    letterSpacing: "-0.01em",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <span style={{ width: "20px", height: "1px", backgroundColor: "#3A3645", flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ paddingInline: "clamp(1.5rem, 5vw, 4rem)", paddingBlock: "clamp(4rem, 8vw, 8rem)" }}>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ABA7E3", margin: 0, marginBottom: "5rem" }}>
          Recorrido
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {timeline.map((entry, i) => (
            <div
              key={entry.year}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1px 1fr",
                gap: "0 3rem",
                paddingBottom: i < timeline.length - 1 ? "5rem" : 0,
              }}
            >
              {/* Year */}
              <div style={{ textAlign: "right", paddingTop: "0.25rem" }}>
                <span
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    fontWeight: 300,
                    color: "#3A3645",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {entry.year}
                </span>
              </div>

              {/* Timeline line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "1px", height: "12px", backgroundColor: "#ABA7E3" }} />
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#ABA7E3", flexShrink: 0 }} />
                {i < timeline.length - 1 && (
                  <div style={{ width: "1px", flex: 1, backgroundColor: "#221F2C" }} />
                )}
              </div>

              {/* Content */}
              <div>
                <h3
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    fontWeight: 300,
                    color: "#EDE8DF",
                    margin: 0,
                    marginBottom: "1rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {entry.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "0.9375rem",
                    lineHeight: 1.75,
                    color: "#6A6575",
                    margin: 0,
                    marginBottom: "2rem",
                    maxWidth: "56ch",
                  }}
                >
                  {entry.text}
                </p>
                <div style={{ backgroundColor: "#13111A", aspectRatio: "16/9", maxWidth: "480px", overflow: "hidden" }}>
                  <img
                    src={entry.image}
                    alt={entry.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div
        style={{
          borderTop: "1px solid #221F2C",
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          paddingBlock: "clamp(4rem, 8vw, 7rem)",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "5rem",
          alignItems: "center",
        }}
      >
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ABA7E3", margin: 0 }}>
          Filosofía de trabajo
        </p>
        <p
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: "clamp(1.375rem, 2.5vw, 2rem)",
            fontWeight: 300,
            lineHeight: 1.5,
            letterSpacing: "-0.01em",
            color: "#EDE8DF",
            margin: 0,
          }}
        >
          "El tatuaje es la excusa para llegar al cuerpo. Lo que me interesa es la imagen, la idea que la genera, y la conversación que produce entre dos personas."
        </p>
      </div>
    </div>
  );
}
