import { useState } from "react";
import { newsItems } from "../data";
import type { NewsItem } from "../data";

function NewsDetail({ item, onClose }: { item: NewsItem; onClose: () => void }) {
  return (
    <div style={{ paddingTop: "72px" }}>
      <div style={{ paddingInline: "clamp(1.5rem, 5vw, 4rem)", paddingBlock: "3rem" }}>
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
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#EDE8DF"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6A6575"; }}
        >
          ← Novedades
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", marginBottom: "4rem" }}>
          <div>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ABA7E3", margin: 0, marginBottom: "1.5rem" }}>
              {item.tag} · {item.date}
            </p>
            <h1
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "#EDE8DF",
                margin: 0,
                marginBottom: "2rem",
                lineHeight: 1.1,
              }}
            >
              {item.title}
            </h1>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "#6A6575" }}>
              {item.excerpt}
            </p>
          </div>
          <div style={{ backgroundColor: "#13111A", aspectRatio: "4/3", overflow: "hidden" }}>
            <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function News() {
  const [selected, setSelected] = useState<NewsItem | null>(null);

  if (selected) {
    return <NewsDetail item={selected} onClose={() => setSelected(null)} />;
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
          <em style={{ fontStyle: "italic" }}>Novedades</em>
        </h1>
      </div>

      {/* List */}
      <div style={{ paddingInline: "clamp(1.5rem, 5vw, 4rem)" }}>
        {newsItems.map((item, i) => (
          <div key={item.id}>
            <div
              onClick={() => setSelected(item)}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr auto",
                gap: "3rem",
                alignItems: "center",
                paddingBlock: "2.5rem",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.65"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              {/* Date badge */}
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.75rem", fontWeight: 300, color: "#3A3645", margin: 0, lineHeight: 1 }}>{item.month}</p>
                <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.1em", color: "#6A6575", margin: 0, marginTop: "0.25rem" }}>{item.year}</p>
              </div>

              {/* Content */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }}>
                <div>
                  <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(1.125rem, 2.5vw, 1.625rem)", fontWeight: 400, color: "#EDE8DF", margin: 0, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
                    {item.title}
                  </p>
                  <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.875rem", color: "#6A6575", margin: 0, lineHeight: 1.6, maxWidth: "60ch" }}>
                    {item.excerpt}
                  </p>
                </div>
                <div style={{ backgroundColor: "#13111A", width: "90px", height: "70px", overflow: "hidden", flexShrink: 0 }}>
                  <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>

              <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#ABA7E3", padding: "0.3rem 0.75rem", border: "1px solid #221F2C", flexShrink: 0 }}>
                {item.tag}
              </span>
            </div>
            {i < newsItems.length - 1 && <div style={{ height: "1px", backgroundColor: "#221F2C" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
