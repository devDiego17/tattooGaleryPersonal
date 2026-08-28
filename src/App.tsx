import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Archive from "./pages/Archive";
import News from "./pages/News";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Studio from "./pages/Studio";
import Book from "./pages/Book";
import type { Page } from "./data";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  const noFooterPages: Page[] = [];

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home onNav={setPage} />;
      case "gallery":
        return <Gallery />;
      case "archive":
        return <Archive />;
      case "news":
        return <News />;
      case "shop":
        return <Shop />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "studio":
        return <Studio />;
      case "book":
        return <Book />;
      default:
        return <Home onNav={setPage} />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100svh",
        backgroundColor: "#09080E",
        color: "#EDE8DF",
      }}
    >
      <Nav current={page} onNav={setPage} />

      <main>
        {renderPage()}
      </main>

      {!noFooterPages.includes(page) && <Footer onNav={setPage} />}
    </div>
  );
}
