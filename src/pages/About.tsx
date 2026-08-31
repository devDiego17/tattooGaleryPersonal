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
    <div className="pt-16 md:pt-20 w-full overflow-hidden">
      {/* Hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh] md:min-h-[70vh] border-b border-[#221F2C]">
        <div className="px-6 py-12 sm:px-10 sm:py-16 md:p-14 lg:p-20 flex flex-col justify-center md:justify-end order-2 md:order-1">
          <p className="font-['Instrument_Sans',sans-serif] text-[0.625rem] tracking-[0.2em] uppercase text-[#ABA7E3] m-0 mb-6">
            Sobre mí
          </p>
          <h1 className="font-['Fraunces',Georgia,serif] text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#EDE8DF] m-0 mb-6 leading-[0.95]">
            Diego
            <br />
            <em className="italic">Patiño</em>
          </h1>
          <p className="font-['Instrument_Sans',sans-serif] text-[0.9375rem] sm:text-base leading-relaxed text-[#6A6575] max-w-[46ch]">
            Artista y tatuador multidisciplinario radicado en Medellín. El trabajo cruza el tatuaje, la ilustración, el diseño y la pintura con una misma pregunta de fondo: qué puede hacer una imagen.
          </p>
        </div>

        <div className="bg-[#13111A] overflow-hidden order-1 md:order-2 h-[320px] sm:h-[420px] md:h-auto min-h-full">
          <img
            src="/rostro.jpg"
            alt="Diego Patiño"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Disciplines + Influences */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#221F2C]">
        {[
          { label: "Disciplinas", items: disciplines },
          { label: "Influencias", items: influences },
        ].map(({ label, items }, i) => (
          <div
            key={label}
            className={`p-6 sm:p-10 md:p-14 lg:p-20 ${
              i === 0 ? "border-b md:border-b-0 md:border-r border-[#221F2C]" : ""
            }`}
          >
            <p className="font-['Instrument_Sans',sans-serif] text-[0.625rem] tracking-[0.2em] uppercase text-[#ABA7E3] m-0 mb-6">
              {label}
            </p>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {items.map((item) => (
                <li
                  key={item}
                  className="font-['Fraunces',Georgia,serif] text-lg sm:text-xl lg:text-2xl font-light text-[#EDE8DF] tracking-tight flex items-center gap-3"
                >
                  <span className="w-4 sm:w-5 h-px bg-[#3A3645] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-32 max-w-6xl mx-auto">
        <p className="font-['Instrument_Sans',sans-serif] text-[0.625rem] tracking-[0.2em] uppercase text-[#ABA7E3] m-0 mb-12 sm:mb-16">
          Recorrido
        </p>

        <div className="flex flex-col">
          {timeline.map((entry, i) => (
            <div
              key={entry.year}
              className={`grid grid-cols-[55px_20px_1fr] sm:grid-cols-[85px_24px_1fr] md:grid-cols-[110px_32px_1fr] gap-x-3 sm:gap-x-6 md:gap-x-8 ${
                i < timeline.length - 1 ? "pb-12 sm:pb-16 md:pb-20" : ""
              }`}
            >
              {/* Year */}
              <div className="text-right pt-1">
                <span className="font-['Fraunces',Georgia,serif] text-xl sm:text-2xl md:text-4xl font-light text-[#4a4555] tracking-tight">
                  {entry.year}
                </span>
              </div>

              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="w-px h-3 bg-[#ABA7E3]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#ABA7E3] shrink-0 my-0.5" />
                {i < timeline.length - 1 && (
                  <div className="w-px flex-1 bg-[#221F2C]" />
                )}
              </div>

              {/* Content */}
              <div className="pt-0.5">
                <h3 className="font-['Fraunces',Georgia,serif] text-xl sm:text-2xl md:text-3xl font-light text-[#EDE8DF] m-0 mb-3 tracking-tight">
                  {entry.title}
                </h3>
                <p className="font-['Instrument_Sans',sans-serif] text-sm sm:text-base leading-relaxed text-[#6A6575] m-0 mb-6 max-w-xl">
                  {entry.text}
                </p>
                <div className="bg-[#13111A] aspect-video w-full max-w-md rounded-xs overflow-hidden border border-[#221F2C]/50">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="border-t border-[#221F2C] px-6 sm:px-10 lg:px-16 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-6 md:gap-16 items-start md:items-center max-w-6xl mx-auto">
        <p className="font-['Instrument_Sans',sans-serif] text-[0.625rem] tracking-[0.2em] uppercase text-[#ABA7E3] m-0">
          Filosofía de trabajo
        </p>
        <blockquote className="font-['Fraunces',Georgia,serif] text-xl sm:text-2xl md:text-3xl font-light leading-snug text-[#EDE8DF] m-0 tracking-tight">
          "El tatuaje es la excusa para llegar al cuerpo. Lo que me interesa es la imagen, la idea que la genera, y la conversación que produce entre dos personas."
        </blockquote>
      </div>
    </div>
  );
}

