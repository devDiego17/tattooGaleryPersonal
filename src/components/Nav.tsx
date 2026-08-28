import { useState, useEffect } from "react";
import type { Page } from "../data";

interface NavProps {
  current: Page;
  onNav: (page: Page) => void;
}

const links: { label: string; page: Page }[] = [
  { label: "Galeria", page: "gallery" },
  { label: "Archivo", page: "archive" },
  { label: "Novedades", page: "news" },
  { label: "Tienda", page: "shop" },
  { label: "Sobre Mi", page: "about" },
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
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "64px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          paddingInline: "clamp(1.25rem, 4vw, 3rem)",
          gap: "1rem",
          borderBottom: scrolled ? "1px solid #221F2C" : "1px solid transparent",
          backgroundColor: scrolled ? "rgba(9,8,14,0.96)" : "rgba(9,8,14,0.0)",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "background-color 0.3s, border-color 0.3s",
        }}
      >
        {/* Left — Logo */}
        <button
          onClick={() => navigate("home")}
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.6875rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "#EDE8DF",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            justifySelf: "start",
            flexShrink: 0,
          }}
        >
          Diego Patiño
        </button>

        {/* Center — nav links (desktop only) */}
        <nav
          className="hidden md:flex"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(1rem, 2vw, 2rem)",
            justifyContent: "center",
          }}
        >
          {links.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className={`nav-link ${current === page ? "active" : ""}`}
              style={navLinkStyle(page)}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#EDE8DF"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = current === page ? "#EDE8DF" : "#6A6575"; }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right — Agendar CTA + Estudio (desktop) / Hamburger (mobile) */}
        <div style={{ justifySelf: "end", display: "flex", alignItems: "center", gap: "1.25rem" }}>
          {/* Agendar — desktop */}
          <button
            onClick={() => navigate("book")}
            className="hidden md:block"
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#09080E",
              background: current === "book"
                ? "#c5c2ee"
                : "#ABA7E3",
              border: "none",
              borderRadius: "2px",
              padding: "0.55rem 1.25rem",
              cursor: "pointer",
              flexShrink: 0,
              boxShadow: "0 0 18px rgba(171,167,227,0.35)",
              transition: "background 0.2s, box-shadow 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#c5c2ee";
              e.currentTarget.style.boxShadow = "0 0 32px rgba(171,167,227,0.6)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = current === "book" ? "#c5c2ee" : "#ABA7E3";
              e.currentTarget.style.boxShadow = "0 0 18px rgba(171,167,227,0.35)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Agendar
          </button>

          {/* Estudio — desktop */}
          <button
            onClick={() => navigate("studio")}
            className="hidden md:block"
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.6875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "#6A6575",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "color 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#EDE8DF"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#6A6575"; }}
          >
            Estudio &#8599;
          </button>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
            aria-label="Menu"
          >
            <span style={{ display: "block", width: "22px", height: "1px", backgroundColor: menuOpen ? "#ABA7E3" : "#EDE8DF", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span style={{ display: "block", width: "22px", height: "1px", backgroundColor: "#EDE8DF", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "22px", height: "1px", backgroundColor: menuOpen ? "#ABA7E3" : "#EDE8DF", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 90,
          backgroundColor: "#09080E",
          paddingTop: "64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingInline: "2rem",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {links.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "clamp(1.8rem, 8vw, 3rem)",
                fontWeight: 300,
                color: current === page ? "#ABA7E3" : "#EDE8DF",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                textAlign: "left",
                letterSpacing: "-0.01em",
              }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => navigate("book")}
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "clamp(1.8rem, 8vw, 3rem)",
              fontWeight: 300,
              color: current === "book" ? "#ABA7E3" : "#EDE8DF",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              textAlign: "left",
              letterSpacing: "-0.01em",
            }}
          >
            Agendar
          </button>
          <button
            onClick={() => navigate("studio")}
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "clamp(1.8rem, 8vw, 3rem)",
              fontWeight: 300,
              color: "#6A6575",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              textAlign: "left",
              letterSpacing: "-0.01em",
            }}
          >
            Estudio &#8599;
          </button>
        </nav>
        <div style={{ marginTop: "auto", paddingBottom: "3rem", display: "flex", gap: "2rem" }}>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A6575" }}>Instagram</a>
          <a href="mailto:hola@diegopatino.co" style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A6575" }}>Email</a>
        </div>
      </div>
    </>
  );
}
