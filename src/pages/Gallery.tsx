import { useState } from "react";
import { works, galleryCategories } from "../data";
import type { Work } from "../data";
import WorkMedia from "../components/WorkMedia";

function WorkDetail({ work, onClose }: { work: Work; onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        backgroundColor: "#09080E",
        overflowY: "auto",
        paddingTop: "72px",
      }}
    >
      <div style={{ paddingInline: "clamp(1.5rem, 5vw, 4rem)", paddingBlock: "3rem" }}>
        {/* Back */}
        <button
          onClick={onClose}
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.6875rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6A6575",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            marginBottom: "4rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#EDE8DF"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6A6575"; }}
        >
          ← Galería
        </button>

        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            marginBottom: "5rem",
            alignItems: "end",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "#EDE8DF",
                margin: 0,
                marginBottom: "1.5rem",
                lineHeight: 0.95,
              }}
            >
              {work.title}
            </h1>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.875rem", color: "#6A6575", lineHeight: 1.7, maxWidth: "50ch" }}>
              {work.description}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem 3rem" }}>
            {[
              { label: "Año", value: work.year.toString() },
              { label: "Categoría", value: work.category },
              { label: "Técnica", value: work.technique },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6A6575", margin: 0, marginBottom: "0.4rem" }}>{label}</p>
                <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1rem", color: "#EDE8DF", margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main image */}
        <div
          style={{
            backgroundColor: "#13111A",
            marginBottom: "2rem",
            maxHeight: "80vh",
            overflow: "hidden",
          }}
        >
          <WorkMedia
            src={work.image}
            alt={work.title}
            style={{ width: "100%", height: "80vh", objectFit: "cover" }}
          />
        </div>

        {/* Detail images — simulated */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            marginBottom: "5rem",
          }}
        >
          <div style={{ backgroundColor: "#13111A", aspectRatio: "4/3", overflow: "hidden" }}>
            <WorkMedia src={work.image} alt="Detail" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85) contrast(1.1)" }} />
          </div>
          <div style={{ backgroundColor: "#13111A", aspectRatio: "4/3", overflow: "hidden" }}>
            <WorkMedia src={work.image} alt="Process" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) saturate(0.5)", objectPosition: "bottom" }} />
          </div>
        </div>

        {/* Hairline */}
        <div style={{ height: "1px", backgroundColor: "#221F2C", marginBottom: "3rem" }} />
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ABA7E3", marginBottom: "2rem" }}>
          Related Work
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {works.filter((w) => w.id !== work.id && w.category === work.category).slice(0, 3).map((w) => (
            <div key={w.id} style={{ cursor: "pointer", opacity: 0.8, transition: "opacity 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
            >
              <div style={{ backgroundColor: "#13111A", aspectRatio: "4/5", overflow: "hidden", marginBottom: "1rem" }}>
                <WorkMedia src={w.image} alt={w.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "0.9375rem", color: "#EDE8DF", margin: 0, marginBottom: "0.25rem" }}>{w.title}</p>
              <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6575", margin: 0 }}>{w.year} — {w.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const filtered = activeCategory === "All" ? works : works.filter((w) => w.category === activeCategory);

  if (selectedWork) {
    return <WorkDetail work={selectedWork} onClose={() => setSelectedWork(null)} />;
  }

  return (
    <div style={{ paddingTop: "72px" }}>
      {/* Header */}
      <div
        style={{
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          paddingTop: "4rem",
          paddingBottom: "3rem",
          borderBottom: "1px solid #221F2C",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        <h1
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            color: "#EDE8DF",
            margin: 0,
            lineHeight: 0.95,
          }}
        >
          <em style={{ fontStyle: "italic" }}>Galería</em>
        </h1>

        {/* Filters */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: activeCategory === cat ? "#EDE8DF" : "#6A6575",
                background: "none",
                border: "none",
                borderBottom: `1px solid ${activeCategory === cat ? "#ABA7E3" : "transparent"}`,
                paddingBottom: "2px",
                cursor: "pointer",
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          paddingBlock: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "clamp(0.75rem, 2vw, 1.5rem)",
          }}
        >
          {filtered.map((work) => (
            <div
              key={work.id}
              className="work-item"
              onClick={() => setSelectedWork(work)}
              style={{
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#13111A",
                aspectRatio: "4/5",
              }}
            >
              <WorkMedia
                src={work.image}
                alt={work.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                className="overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(9,8,14,0.72)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "1.5rem",
                }}
              >
                <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.125rem", fontWeight: 400, color: "#EDE8DF", margin: 0, marginBottom: "0.375rem" }}>
                  {work.title}
                </p>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#ABA7E3" }}>{work.year}</span>
                  <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6A6575" }}>{work.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
