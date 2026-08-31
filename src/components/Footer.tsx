import type { Page } from "../data";

interface FooterProps {
  onNav: (page: Page) => void;
}

export default function Footer({ onNav }: FooterProps) {
  const navigate = (page: Page) => {
    onNav(page);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <footer
      style={{
        borderTop: "1px solid #221F2C",
        paddingInline: "clamp(1.5rem, 5vw, 4rem)",
        paddingBlock: "3rem",
      }}
      className="w-full max-w-full overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center md:items-end">
        {/* Left */}
        <div className="text-center md:text-left">
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#EDE8DF",
              marginBottom: "0.5rem",
              fontWeight: 500,
            }}
          >
            Diego Patiño
          </p>
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.625rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#6A6575",
            }}
          >
            Medellín, Colombia
          </p>
        </div>

        {/* Center */}
        <nav className="flex flex-wrap gap-x-6 gap-y-3 justify-center">
          {(["gallery", "archive", "news", "shop", "about", "contact"] as Page[]).map((page) => {
            const labels: Record<string, string> = {
              gallery: "Galería",
              archive: "Archivo",
              news: "Novedades",
              shop: "Tienda",
              about: "Sobre Mí",
              contact: "Contacto",
            };
            return (
              <button
                key={page}
                onClick={() => navigate(page)}
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.625rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6A6575",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#EDE8DF";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "#6A6575";
                }}
              >
                {labels[page]}
              </button>
            );
          })}
        </nav>

        {/* Right */}
        <div className="text-center md:text-right">
          <div className="flex gap-6 justify-center md:justify-end mb-3">
            <a
              href="https://www.instagram.com/diegops.ink/"
              target="_blank"
              rel="noreferrer"
              className="link-arrow"
              style={{ color: "#6A6575", fontSize: "0.625rem" }}
            >
              Instagram
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B573009035153&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
              className="link-arrow"
              style={{ color: "#6A6575", fontSize: "0.625rem" }}
            >
              Whatsapp
            </a>
          </div>
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.625rem",
              letterSpacing: "0.08em",
              color: "#3A3645",
            }}
          >
            © 2026 Diego Patiño
          </p>
        </div>
      </div>

      {/* Back to top — spans full */}
      <div
        className="mt-8 pt-6 border-t border-[#221F2C] text-center"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.625rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#3A3645",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.color = "#ABA7E3";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.color = "#3A3645";
          }}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
