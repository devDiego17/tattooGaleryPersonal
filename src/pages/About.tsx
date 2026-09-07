import { useState } from "react";

export default function About() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const timeline = [
    {
      year: "2017",
      period: "01 — Inicios",
      title: "Exploración y Dibujo",
      text: "Primeros trazos y fascinación por la el arte como expresion del alma en la materia.",
      image: "/about/2017.png",
      tag: "Fundamentos",
    },
    {
      year: "2020",
      period: "02 — Evolución",
      title: "Primeros pasos en el tattoo",
      text: "Empiezo a tatuar a mis amigos, en mi casa en plena pandemia del covid 19, experimentando con blackwork, fine line y dotwork. El proyecto evoluciona hacia el cruce entre la ilustración editorial y el tatuaje contemporáneo.",
      image: "/about/2021.jpg",
      tag: "Tatuaje underground",
    },
    {
      year: "2023",
      period: "03 — Espacio",
      title: "Estudio Propio en Medellín",
      text: "me establesco en mi propio estudio, alcanzo un nivel profesional, pero la vida tenia otros planes.",
      image: "/about/2023.jpeg",
      tag: "Robledo, Medellín",
    },
    {
      year: "2026",
      period: "04 — Actualidad",
      title: "Obra de Autor y renacimiento",
      text: "Luego de situaciones personales complicadas, vuelvo al ruedo con mas nivel y mas fuerte que nunca.",
      image: "/about/muerte.jpeg",
      tag: "Obra Contemporánea",
    },
  ];

  const disciplines = [
    { name: "Tatuaje de Autor", desc: "composiciones a medida, en sombras (Claroscuro)" },
    { name: "Ilustración y Grabado", desc: "Piezas en tinta negra" },
    { name: "Obra Plástica", desc: "Exploración de texturas, sombras y gran formato" },
    { name: "Creacion Audiovisual", desc: "Video arte experimental" },
  ];

  const influences = [
    "Caravagio (maestro del claroscuro)",
    "Iconografía & Arte Precolombino",
    "Ilustración Científica del S. XIX",
    "Tatuadores como Hernan Yepes y Santiago Ortiz",
    "Arquitectura Brutalista",
    "Anatomía Clásica",
  ];

  return (
    <div className="w-full bg-[#09080E] text-[#EDE8DF] selection:bg-[#ABA7E3] selection:text-[#09080E]">

      {/* ─────────────────────────────────────────────────────────────────────────
          1. HERO EDITORIAL: TEXTO + RETRATO CONTENIDO (SIN ESPACIO MUERTO)
         ───────────────────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-28 sm:pt-32 pb-20 sm:pb-28 lg:pb-36 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-[#221F2C]">
        {/* Resplandor ambiental sutil */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-[#ABA7E3]/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto">
          {/* Metadatos editoriales */}
          <div className="hidden md:flex items-center justify-between mb-12 text-[0.625rem] tracking-[0.25em] uppercase">
            <div className="flex items-center gap-3 text-[#ABA7E3] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#ABA7E3] animate-pulse" />
              <span>Perfil de Artista &middot; Medellín, Colombia</span>
            </div>
            <span className="text-[#6A6575]">Atención exclusiva &middot; 1 cliente por día</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Texto */}
            <div className="order-2 lg:order-1 lg:col-span-7">
              <span className="inline-block text-[0.6875rem] tracking-[0.25em] uppercase text-[#ABA7E3] font-semibold mb-4">
                Diego Patiño &mdash; Tatuador & Artista
              </span>

              <h1 className="font-['Fraunces',Georgia,serif] text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#EDE8DF] leading-[0.95] mb-6">
                La piel como
                <br />
                <em className="italic font-light text-[#ABA7E3]/90">lienzo y memoria.</em>
              </h1>

              <p className="font-['Instrument_Sans',sans-serif] text-base sm:text-lg leading-relaxed text-[#EDE8DF]/80 max-w-xl font-light mb-8">
                Artista y tatuador multidisciplinario radicado en Medellín. Su obra cruza el tatuaje de línea fina, la ilustración editorial y el grabado oscuro, explorando la relación íntima entre el cuerpo, el dibujo y el significado personal.
              </p>

              {/* Badges de identidad */}
              <div className="flex flex-wrap items-center gap-4 text-xs tracking-wider uppercase text-[#EDE8DF]/80">
                <span className="px-3.5 py-1.5 rounded-full border border-[#221F2C] bg-[#13111A]">
                  Blackwork Claroscuro
                </span>
                <span className="px-3.5 py-1.5 rounded-full border border-[#221F2C] bg-[#13111A]">
                  Estudio Privado en Robledo.
                </span>
              </div>
            </div>

            {/* Retrato, encuadrado a su propia proporción — sin fondo negro sobrante */}
            <div className="order-1 lg:order-2 lg:col-span-5">
              <div className="relative aspect-[4/5] w-full max-w-sm mx-auto lg:max-w-none rounded-sm overflow-hidden border border-[#221F2C] shadow-2xl">
                <img
                  src="/rostro.jpg"
                  alt="Diego Patiño — Retrato"
                  className="w-full h-full object-cover object-[center_22%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09080E]/70 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          2. COMPOSICIÓN EDITORIAL ASIMÉTRICA: EL ESPACIO & LA MIRADA
         ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-[#221F2C]">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Foto dominante 1: Mesa de trabajo / Detalle de arte (7 columnas en desktop) */}
            <div className="lg:col-span-7 relative group">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-sm overflow-hidden bg-[#13111A] border border-[#221F2C] shadow-2xl">
                <img
                  src="/studio/estudio.jpeg"
                  alt="Espacio de trabajo del estudio"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-xs tracking-widest uppercase">
                  <span className="text-[#EDE8DF] font-medium">El Estudio &middot; Medellín</span>
                  <span className="text-[#ABA7E3]">01 / El Refugio Creativo</span>
                </div>
              </div>
            </div>

            {/* Bloque editorial complementario (5 columnas en desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <p className="text-[0.625rem] tracking-[0.25em] uppercase text-[#ABA7E3] font-medium">
                Filosofía de Creación
              </p>

              <h2 className="font-['Fraunces',Georgia,serif] text-3xl sm:text-4xl lg:text-5xl font-light text-[#EDE8DF] leading-[1.05] tracking-tight">
                Cada pieza es una <em className="italic text-[#ABA7E3]">conversación</em> que queda grabada en el tiempo.
              </h2>

              <p className="font-['Instrument_Sans',sans-serif] text-sm sm:text-base leading-relaxed text-[#6A6575]">
                No creo en el tatuaje masivo ni en los catálogos genéricos. Dedicar una jornada completa a un único cliente permite sumergirse en la historia, perfeccionar cada trazo milimétrico y garantizar que la pieza respire con la anatomía de quien la porta.
              </p>

              {/* Fotografía secundaria en escala artística */}
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="aspect-[4/3] rounded-xs overflow-hidden border border-[#221F2C]">
                  <img src="/studio/mesa.jpg" alt="Mesa de diseño" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[4/3] rounded-xs overflow-hidden border border-[#221F2C]">
                  <img src="/about/muerte.png" alt="Detalle de ilustración" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          3. RECORRIDO ARTÍSTICO / TIMELINE VISUAL (FOTOGRAFÍAS EN GRAN FORMATO)
         ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-[#221F2C]">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-6">
            <div>
              <p className="text-[0.625rem] tracking-[0.25em] uppercase text-[#ABA7E3] font-medium mb-3">
                Trayectoria & Hitos
              </p>
              <h2 className="font-['Fraunces',Georgia,serif] text-4xl sm:text-5xl lg:text-6xl font-light text-[#EDE8DF] tracking-tight">
                El Recorrido <em className="italic font-light text-[#ABA7E3]">Visual</em>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6A6575] max-w-md font-light">
              Casi una década de investigación gráfica, perfeccionamiento de técnica y construcción de un lenguaje inconfundible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className="group relative flex flex-col bg-[#13111A]/40 border border-[#221F2C] rounded-sm overflow-hidden p-6 sm:p-8 hover:border-[#ABA7E3]/40 transition-colors duration-500"
                onMouseEnter={() => setActiveImageIndex(index)}
                onMouseLeave={() => setActiveImageIndex(null)}
              >
                {/* Gran Imagen Protagonista de la Etapa */}
                <div className="relative aspect-[16/10] w-full rounded-xs overflow-hidden bg-black/60 mb-6 border border-[#221F2C]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[0.625rem] uppercase tracking-widest text-[#ABA7E3] border border-white/10">
                    {item.tag}
                  </div>
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/10 font-['Fraunces',Georgia,serif] text-lg leading-none text-[#EDE8DF]">
                    {item.year}
                  </div>
                </div>

                <span className="text-[0.625rem] tracking-[0.2em] uppercase text-[#6A6575] mb-2 font-medium">
                  {item.period}
                </span>

                <h3 className="font-['Fraunces',Georgia,serif] text-2xl sm:text-3xl font-light text-[#EDE8DF] tracking-tight mb-3">
                  {item.title}
                </h3>

                <p className="font-['Instrument_Sans',sans-serif] text-sm leading-relaxed text-[#6A6575]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          4. DISCIPLINAS & INFLUENCIAS CON ENFOQUE DE ALTA GAMA
         ───────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-[#221F2C]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Disciplinas */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-[#ABA7E3]" />
              <p className="text-[0.625rem] tracking-[0.25em] uppercase text-[#ABA7E3] font-medium m-0">
                Áreas de Trabajo
              </p>
            </div>

            <div className="space-y-6">
              {disciplines.map((d, i) => (
                <div key={d.name} className="border-b border-[#221F2C] pb-6 group">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-['Fraunces',Georgia,serif] text-2xl sm:text-3xl font-light text-[#EDE8DF] group-hover:text-[#ABA7E3] transition-colors">
                      {d.name}
                    </h3>
                    <span className="text-xs font-mono text-[#4A4555]">0{i + 1}</span>
                  </div>
                  <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6A6575]">
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Influencias Visuales */}
          <div className="lg:pl-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-[#ABA7E3]" />
              <p className="text-[0.625rem] tracking-[0.25em] uppercase text-[#ABA7E3] font-medium m-0">
                Universo Visual & Referentes
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {influences.map((inf) => (
                <div
                  key={inf}
                  className="p-5 rounded-xs bg-[#13111A]/50 border border-[#221F2C] flex items-center gap-3 hover:border-[#ABA7E3]/30 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ABA7E3] shrink-0" />
                  <span className="font-['Instrument_Sans',sans-serif] text-xs sm:text-sm tracking-wide text-[#EDE8DF]/90">
                    {inf}
                  </span>
                </div>
              ))}
            </div>

            {/* Cita de Cierre */}
            <div className="mt-12 p-8 rounded-sm bg-gradient-to-br from-[#13111A] to-[#09080E] border border-[#221F2C]">
              <blockquote className="font-['Fraunces',Georgia,serif] text-xl sm:text-2xl font-light italic text-[#EDE8DF] leading-snug mb-4">
                "El dibujo es el pensamiento que se hace visible; el tatuaje es ese pensamiento convertido en parte de ti."
              </blockquote>
              <span className="text-xs uppercase tracking-widest text-[#ABA7E3] font-medium">
                &mdash; Diego Patiño
              </span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}


