import { useState, useEffect } from "react";
import type { Page } from "../data";

interface NavProps {
  current: Page;
  onNav: (page: Page) => void;
}

const links: { label: string; page: Page }[] = [
  { label: "Galería", page: "gallery" },
  { label: "Archivo", page: "archive" },
  { label: "Novedades", page: "news" },
  { label: "Tienda", page: "shop" },
  { label: "Sobre Mí", page: "about" },
  { label: "Contacto", page: "contact" },
];

export default function Nav({ current, onNav }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navigate = (page: Page) => {
    onNav(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const navLinkStyle = (page: Page): React.CSSProperties => ({
    fontFamily: "'Instrument Sans', sans-serif",
    fontSize: "0.6875rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 500,
    color: current === page ? "#EDE8DF" : "#6A6575",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    transition: "color 0.2s",
    position: "relative",
    paddingBottom: "2px",
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled
            ? "bg-[#09080E]/95 border-b border-[#221F2C] backdrop-blur-md"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
          {/* Left — Logo */}
          <button
            onClick={() => navigate("home")}
            className="text-left font-['Instrument_Sans',sans-serif] text-[0.6875rem] tracking-[0.16em] uppercase font-semibold text-[#EDE8DF] bg-transparent border-0 p-0 cursor-pointer justify-self-start shrink-0 hover:opacity-80 transition-opacity"
          >
            Diego Patiño
          </button>

          {/* Center — nav links (desktop only) */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-8 justify-center">
            {links.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => navigate(page)}
                className={`nav-link ${current === page ? "active" : ""}`}
                style={navLinkStyle(page)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#EDE8DF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    current === page ? "#EDE8DF" : "#6A6575";
                }}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Right — Actions */}
          <div className="flex items-center gap-3 sm:gap-5 justify-self-end">
            {/* Agendar — desktop */}
            <button
              onClick={() => navigate("book")}
              className="hidden md:block font-['Instrument_Sans',sans-serif] text-[0.75rem] tracking-[0.12em] uppercase font-bold text-[#09080E] bg-[#ABA7E3] hover:bg-[#c5c2ee] rounded-xs px-4 py-2 cursor-pointer shrink-0 shadow-[0_0_18px_rgba(171,167,227,0.35)] hover:shadow-[0_0_28px_rgba(171,167,227,0.6)] hover:-translate-y-0.5 transition-all"
            >
              Agendar
            </button>

            {/* Estudio — desktop */}
            <button
              onClick={() => navigate("studio")}
              className="hidden lg:block font-['Instrument_Sans',sans-serif] text-[0.6875rem] tracking-[0.12em] uppercase font-medium text-[#6A6575] hover:text-[#EDE8DF] bg-transparent border-0 p-0 cursor-pointer shrink-0 transition-colors"
            >
              Estudio &#8599;
            </button>

            {/* Agendar mini CTA — mobile */}
            <button
              onClick={() => navigate("book")}
              className="md:hidden font-['Instrument_Sans',sans-serif] text-[0.6875rem] tracking-[0.1em] uppercase font-bold text-[#09080E] bg-[#ABA7E3] px-3 py-1.5 rounded-xs cursor-pointer"
            >
              Agendar
            </button>

            {/* Hamburger — mobile */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 p-1 bg-transparent border-0 cursor-pointer gap-1.5 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span
                className={`block w-5.5 h-0.5 bg-[#EDE8DF] transition-transform duration-300 ease-in-out ${
                  menuOpen ? "rotate-45 translate-y-2 bg-[#ABA7E3]" : ""
                }`}
              />
              <span
                className={`block w-5.5 h-0.5 bg-[#EDE8DF] transition-opacity duration-300 ease-in-out ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block w-5.5 h-0.5 bg-[#EDE8DF] transition-transform duration-300 ease-in-out ${
                  menuOpen ? "-rotate-45 -translate-y-2 bg-[#ABA7E3]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""} fixed inset-0 z-40 bg-[#09080E] pt-20 px-6 pb-8 flex flex-col justify-between overflow-y-auto md:hidden`}
      >
        <nav className="flex flex-col gap-5 sm:gap-6 my-auto pt-4 pb-6">
          {links.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className={`text-left font-['Fraunces',Georgia,serif] text-3xl sm:text-4xl font-light tracking-tight bg-transparent border-0 p-0 cursor-pointer transition-colors ${
                current === page ? "text-[#ABA7E3]" : "text-[#EDE8DF] hover:text-[#ABA7E3]"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => navigate("book")}
            className={`text-left font-['Fraunces',Georgia,serif] text-3xl sm:text-4xl font-light tracking-tight bg-transparent border-0 p-0 cursor-pointer transition-colors ${
              current === "book" ? "text-[#ABA7E3]" : "text-[#ABA7E3] hover:text-white"
            }`}
          >
            Agendar cita →
          </button>
          <button
            onClick={() => navigate("studio")}
            className="text-left font-['Fraunces',Georgia,serif] text-2xl sm:text-3xl font-light tracking-tight text-[#6A6575] hover:text-[#EDE8DF] bg-transparent border-0 p-0 cursor-pointer transition-colors"
          >
            Estudio &#8599;
          </button>
        </nav>

        <div className="pt-6 border-t border-[#221F2C] flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/diegops.ink/"
              target="_blank"
              rel="noreferrer"
              className="text-[0.6875rem] tracking-[0.12em] uppercase text-[#6A6575] hover:text-[#EDE8DF] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B573009035153&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
              className="text-[0.6875rem] tracking-[0.12em] uppercase text-[#6A6575] hover:text-[#EDE8DF] transition-colors"
            >
              WhatsApp
            </a>
          </div>
          <span className="text-[0.625rem] tracking-[0.08em] text-[#3A3645]">
            © 2026 Diego Patiño
          </span>
        </div>
      </div>
    </>
  );
}
