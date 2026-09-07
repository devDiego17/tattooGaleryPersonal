import { useState } from "react";
import { products, formatCOP } from "../data";
import type { Product } from "../data";

const shopCategories = ["Todas", "Impresiones", "Ropa", "Objetos", "Ediciones Limitadas"];

function ProductDetail({ product, onClose }: { product: Product; onClose: () => void }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleBuy = () => {
    if (!product.available) return;
    const lines = [
      `Hola Diego! Quiero comprar: ${product.name}`,
      selectedSize ? `Talla: ${selectedSize}` : null,
      product.price > 0 ? `Precio: ${formatCOP(product.price)}` : null,
      "¿Me confirmas disponibilidad y cómo coordinamos el pago y envío?",
    ].filter(Boolean);
    const url = `https://wa.me/573009035153?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank");
  };

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
          ← Tienda
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 7rem)", alignItems: "start" }}>
          {/* Image */}
          <div style={{ backgroundColor: "#13111A", aspectRatio: "3/4", overflow: "hidden" }}>
            <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Details */}
          <div style={{ paddingTop: "1rem" }}>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ABA7E3", margin: 0, marginBottom: "1.5rem" }}>
              {product.category}
            </p>
            <h1
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "#EDE8DF",
                margin: 0,
                marginBottom: "1rem",
                lineHeight: 1.1,
              }}
            >
              {product.name}
            </h1>

            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "1.375rem", fontWeight: 500, color: "#ABA7E3", margin: 0, marginBottom: "2rem" }}>
              {formatCOP(product.price)}
            </p>

            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.9375rem", lineHeight: 1.7, color: "#6A6575", marginBottom: "2.5rem" }}>
              {product.description}
            </p>

            {/* Metadata */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2.5rem", paddingBlock: "1.5rem", borderTop: "1px solid #221F2C", borderBottom: "1px solid #221F2C" }}>
              <div>
                <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6A6575", margin: 0, marginBottom: "0.4rem" }}>Edición</p>
                <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "0.9375rem", color: "#EDE8DF", margin: 0 }}>{product.edition}</p>
              </div>
              <div>
                <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6A6575", margin: 0, marginBottom: "0.4rem" }}>Disponibilidad</p>
                <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "0.9375rem", color: product.available ? "#ABA7E3" : "#890C50", margin: 0 }}>
                  {product.available ? "Disponible" : "Agotado"}
                </p>
              </div>
            </div>

            {/* Sizes */}
            {product.sizes && (
              <div style={{ marginBottom: "2.5rem" }}>
                <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A6575", marginBottom: "1rem" }}>
                  Talla
                </p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        fontFamily: "'Instrument Sans', sans-serif",
                        fontSize: "0.6875rem",
                        letterSpacing: "0.1em",
                        color: selectedSize === size ? "#09080E" : "#EDE8DF",
                        backgroundColor: selectedSize === size ? "#ABA7E3" : "transparent",
                        border: `1px solid ${selectedSize === size ? "#ABA7E3" : "#221F2C"}`,
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        minWidth: "52px",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Comprar por WhatsApp */}
            <button
              onClick={handleBuy}
              disabled={!product.available}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: product.available ? "#09080E" : "#6A6575",
                backgroundColor: product.available ? "#25D366" : "#1C1A24",
                border: "none",
                padding: "1.125rem 2rem",
                cursor: product.available ? "pointer" : "not-allowed",
                transition: "background-color 0.3s, opacity 0.2s",
              }}
              onMouseEnter={(e) => { if (product.available) e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              {product.available && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              )}
              {!product.available ? "Agotado" : "Comprar por WhatsApp"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = activeCategory === "Todas" ? products : products.filter((p) => p.category === activeCategory);

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />;
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
          <em style={{ fontStyle: "italic" }}>Tienda</em>
        </h1>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          {shopCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div
        style={{
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          paddingBlock: "clamp(2rem, 4vw, 4rem)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "clamp(2rem, 4vw, 3.5rem)",
        }}
      >
        {filtered.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            style={{ cursor: "pointer" }}
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
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "0.5625rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: product.available ? "#09080E" : "#EDE8DF",
                  backgroundColor: product.available ? "#ABA7E3" : "#890C50",
                  padding: "0.3rem 0.6rem",
                }}
              >
                {product.available ? "Disponible" : "Agotado"}
              </div>
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
    </div>
  );
}
