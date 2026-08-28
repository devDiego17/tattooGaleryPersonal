import { useState } from "react";
import { archiveYears } from "../data";
import WorkMedia from "../components/WorkMedia";

export default function Archive() {
  const years = Object.keys(archiveYears).map(Number).sort((a, b) => b - a);
  const [expandedYear, setExpandedYear] = useState<number | null>(years[0]);

  return (
    <div style={{ paddingTop: "72px" }}>
      {/* Header */}
      <div
        style={{
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          paddingTop: "4rem",
          paddingBottom: "3rem",
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
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "#EDE8DF",
              margin: 0,
              lineHeight: 0.95,
            }}
          >
            <em style={{ fontStyle: "italic" }}>Archivo</em>
          </h1>
        </div>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.9375rem", lineHeight: 1.7, color: "#6A6575", margin: 0 }}>
          El recorrido creativo completo. Bocetos, estudios, experimentos y obras terminadas organizados cronológicamente.
        </p>
      </div>

      {/* Year accordion */}
      <div style={{ paddingInline: "clamp(1.5rem, 5vw, 4rem)" }}>
        {years.map((year) => {
          const yearWorks = archiveYears[year] || [];
          const isOpen = expandedYear === year;

          return (
            <div key={year} style={{ borderBottom: "1px solid #221F2C" }}>
              {/* Year row */}
              <button
                onClick={() => setExpandedYear(isOpen ? null : year)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBlock: "2.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "2rem" }}>
                  <span
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      fontWeight: 300,
                      color: isOpen ? "#EDE8DF" : "#3A3645",
                      letterSpacing: "-0.02em",
                      transition: "color 0.3s",
                    }}
                  >
                    {year}
                  </span>
                  <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A6575" }}>
                    {yearWorks.length} {yearWorks.length === 1 ? "obra" : "obras"}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "1.25rem",
                    color: "#6A6575",
                    transition: "transform 0.3s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    display: "block",
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>

              {/* Expanded works */}
              {isOpen && yearWorks.length > 0 && (
                <div
                  style={{
                    paddingBottom: "3rem",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "1.25rem",
                  }}
                >
                  {yearWorks.map((work) => (
                    <div
                      key={work.id}
                      className="work-item"
                      style={{ cursor: "pointer", position: "relative", overflow: "hidden", backgroundColor: "#13111A" }}
                    >
                      <WorkMedia
                        src={work.image}
                        alt={work.title}
                        style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }}
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
                          padding: "1.25rem",
                        }}
                      >
                        <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "0.9375rem", color: "#EDE8DF", margin: 0, marginBottom: "0.25rem" }}>{work.title}</p>
                        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#ABA7E3", margin: 0 }}>{work.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isOpen && yearWorks.length === 0 && (
                <div style={{ paddingBottom: "3rem" }}>
                  <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.875rem", color: "#6A6575", fontStyle: "italic" }}>
                    Sin obras registradas para este año.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
