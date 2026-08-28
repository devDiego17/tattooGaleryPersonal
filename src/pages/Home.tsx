import { works, newsItems, products, formatCOP } from "../data";
import type { Page } from "../data";
import WorkMedia from "../components/WorkMedia";

interface HomeProps {
  onNav: (page: Page) => void;
}

function ArrowLink({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="link-arrow"
      style={{ color: "#EDE8DF", background: "none", border: "none", padding: 0, cursor: "pointer" }}
    >
      <span style={{ color: "#ABA7E3" }}>→</span> {children}
    </button>
  );
}

export default function Home({ onNav }: HomeProps) {
  const navigate = (page: Page) => {
    onNav(page);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const selectedWorks = works.slice(0, 8);
  const selectedProducts = products.slice(0, 3);
  const selectedNews = newsItems.slice(0, 4);

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          height: "100svh",
          minHeight: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
          backgroundColor: "#13111A",
        }}
      >
        {/* Hero image */}
        <img
          src="/Background.jpeg"
          alt="Diego Patiño — artist and tattooer"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.65,
          }}
        />

        {/* Gradient overlay — bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, #09080E 0%, rgba(9,8,14,0.3) 50%, transparent 100%)",
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            paddingInline: "clamp(1.5rem, 5vw, 4rem)",
            paddingBottom: "clamp(3rem, 6vw, 5rem)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                color: "#EDE8DF",
                margin: 0,
                marginBottom: "1.25rem",
              }}
            >
              Diego
              <br />
              <em style={{ fontStyle: "italic" }}>Patiño</em>
            </h1>
            <p
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#ABA7E3",
                margin: 0,
              }}
            >
              Artist · Tattooer · Medellín, Colombia
            </p>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6A6575", writingMode: "vertical-rl" }}>Scroll</span>
            <div style={{ width: "1px", height: "48px", backgroundColor: "#221F2C" }}>
              <div
                style={{
                  width: "1px",
                  height: "50%",
                  backgroundColor: "#ABA7E3",
                  animation: "scrollPulse 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scrollPulse {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(100%); opacity: 0.3; }
          }
        `}</style>
      </section>

      {/* ── ABOUT INTRO ──────────────────────────────────── */}
      <section
        style={{
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          paddingBlock: "clamp(5rem, 10vw, 9rem)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 6vw, 7rem)",
          alignItems: "center",
          borderBottom: "1px solid #221F2C",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.625rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#ABA7E3",
              marginBottom: "2.5rem",
            }}
          >
            About
          </p>
          <p
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 300,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: "#EDE8DF",
              marginBottom: "2rem",
            }}
          >
            Artista y tatuador radicado en Medellín, con un enfoque multidisciplinario que cruza el tatuaje, la ilustración, el diseño y la pintura.
          </p>
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              color: "#6A6575",
              marginBottom: "3rem",
              maxWidth: "42ch",
            }}
          >
            Cada proyecto es una exploración de ideas, medios y posibilidades. El estudio en El Poblado es el espacio donde convergen el oficio, la investigación y la experimentación.
          </p>
          <ArrowLink onClick={() => navigate("about")}>Conocer mi recorrido</ArrowLink>
        </div>

        <div
          style={{
            position: "relative",
            backgroundColor: "#13111A",
            aspectRatio: "4/5",
            overflow: "hidden",
          }}
        >
          <img
            src="/rostro.jpg"
            alt="Diego Patiño in the studio"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Small accent label */}
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "1.5rem",
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.5625rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#ABA7E3",
              backgroundColor: "rgba(9,8,14,0.7)",
              padding: "0.4rem 0.75rem",
            }}
          >
            El Poblado, Medellín
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK ─────────────────────────────────── */}
      <section
        style={{
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          paddingBlock: "clamp(5rem, 10vw, 9rem)",
          borderBottom: "1px solid #221F2C",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "clamp(2.5rem, 5vw, 4.5rem)",
          }}
        >
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.625rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#ABA7E3",
            }}
          >
            Selected Work
          </p>
          <ArrowLink onClick={() => navigate("gallery")}>Ver toda la galería</ArrowLink>
        </div>

        {/* Editorial grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6"
        >
          {selectedWorks.map((work) => (
            <div
              key={work.id}
              className="work-item"
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                backgroundColor: "#13111A",
                aspectRatio: "4/5",
              }}
            >
                <WorkMedia
                  src={work.image}
                  alt={work.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Hover overlay */}
                <div
                  className="overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(9,8,14,0.72)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "1.75rem",
                  }}
                >
                  <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.25rem", fontWeight: 400, color: "#EDE8DF", margin: 0, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
                    {work.title}
                  </p>
                  <div style={{ display: "flex", gap: "1.25rem" }}>
                    <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#ABA7E3" }}>{work.year}</span>
                    <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A6575" }}>{work.category}</span>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </section>

      {/* ── NOVEDADES ─────────────────────────────────────── */}
      <section
        style={{
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          paddingBlock: "clamp(5rem, 10vw, 9rem)",
          borderBottom: "1px solid #221F2C",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ABA7E3" }}>
            Latest / Novedades
          </p>
          <ArrowLink onClick={() => navigate("news")}>Ver todas las novedades</ArrowLink>
        </div>

        <div>
          {selectedNews.map((item, i) => (
            <div key={item.id}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr auto",
                  gap: "2rem",
                  alignItems: "baseline",
                  paddingBlock: "1.75rem",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                <span
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                    color: "#6A6575",
                    letterSpacing: "0.04em",
                  }}
                >
                  {item.date}
                </span>
                <span
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "clamp(1rem, 2vw, 1.375rem)",
                    fontWeight: 400,
                    color: "#EDE8DF",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "0.5625rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#6A6575",
                    padding: "0.3rem 0.75rem",
                    border: "1px solid #221F2C",
                  }}
                >
                  {item.tag}
                </span>
              </div>
              {i < selectedNews.length - 1 && <div style={{ height: "1px", backgroundColor: "#221F2C" }} />}
            </div>
          ))}
        </div>
      </section>

      {/* ── SHOP ──────────────────────────────────────────── */}
      <section
        style={{
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          paddingBlock: "clamp(5rem, 10vw, 9rem)",
          borderBottom: "1px solid #221F2C",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ABA7E3" }}>
            Shop
          </p>
          <ArrowLink onClick={() => navigate("shop")}>Visitar tienda</ArrowLink>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(1rem, 3vw, 2rem)",
          }}
        >
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("shop")}
            >
              <div
                style={{
                  backgroundColor: "#13111A",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  marginBottom: "1.25rem",
                  position: "relative",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                  onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }}
                />
                {!product.available && (
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#EDE8DF", backgroundColor: "#890C50", padding: "0.3rem 0.6rem" }}>
                    Agotado
                  </div>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1rem", fontWeight: 400, color: "#EDE8DF", margin: 0, marginBottom: "0.25rem" }}>
                    {product.name}
                  </p>
                  <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6575", margin: 0 }}>
                    {product.edition}
                  </p>
                </div>
                <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#ABA7E3", margin: 0 }}>
                  {formatCOP(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT + STUDIO ───────────────────────────────── */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "400px",
        }}
      >
        {/* Contact half */}
        <div
          style={{
            padding: "clamp(3rem, 6vw, 6rem)",
            borderRight: "1px solid #221F2C",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ABA7E3", margin: 0 }}>
            Contact
          </p>
          <div>
            <p
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: "#EDE8DF",
                marginBottom: "1rem",
              }}
            >
              Para tatuajes, proyectos o colaboraciones.
            </p>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.875rem", color: "#6A6575", marginBottom: "2.5rem", lineHeight: 1.6 }}>
              Cada proyecto se discute de forma personalizada.
            </p>
            <ArrowLink onClick={() => navigate("contact")}>Contactar</ArrowLink>
          </div>
        </div>

        {/* Studio half */}
        <div
          style={{
            position: "relative",
            backgroundColor: "#13111A",
            overflow: "hidden",
          }}
        >
          <img
            src="/studio/estudio.jpeg"
            alt="Studio space"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(9,8,14,0.85) 0%, transparent 60%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ABA7E3", marginBottom: "0.75rem" }}>
              Studio
            </p>
            <p
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 300,
                color: "#EDE8DF",
                marginBottom: "0.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              Medellín, Colombia
            </p>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.8125rem", color: "#6A6575", marginBottom: "2rem" }}>
              El Poblado · Citas con agenda previa
            </p>
            <ArrowLink onClick={() => navigate("studio")}>Ver ubicación ↗</ArrowLink>
          </div>
        </div>
      </section>
    </div>
  );
}
