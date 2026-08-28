import { useState } from "react";
import { products, formatCOP } from "../data";
import type { Product } from "../data";

const shopCategories = ["All", "Prints", "Apparel", "Objects", "Limited Editions"];

function ProductDetail({ product, onClose }: { product: Product; onClose: () => void }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!product.available) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
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

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              disabled={!product.available}
              style={{
                width: "100%",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: product.available ? "#09080E" : "#6A6575",
                backgroundColor: product.available ? (added ? "#A677CA" : "#EDE8DF") : "#1C1A24",
                border: "none",
                padding: "1.125rem 2rem",
                cursor: product.available ? "pointer" : "not-allowed",
                transition: "background-color 0.3s",
              }}
            >
              {!product.available ? "Agotado" : added ? "Añadido ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

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
          <em style={{ fontStyle: "italic" }}>Shop</em>
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
              {!product.available && (
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "0.5625rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#EDE8DF",
                    backgroundColor: "#890C50",
                    padding: "0.3rem 0.6rem",
                  }}
                >
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
    </div>
  );
}
