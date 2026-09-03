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
import { pageToPath, pathToPage } from "./router";

export default function App() {
  const [page, setPage] = useState<Page>(() => pathToPage(window.location.pathname));

  // Keep the browser history in sync so the back/forward arrows move
  // between sections instead of leaving the site.
  useEffect(() => {
    window.history.replaceState({ page: pathToPage(window.location.pathname) }, "");

    const onPopState = (e: PopStateEvent) => {
      const state = e.state as { page?: Page } | null;
      setPage(state?.page ?? pathToPage(window.location.pathname));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (next: Page) => {
    if (next === page) return;
    window.history.pushState({ page: next }, "", pageToPath(next));
    setPage(next);
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  const noFooterPages: Page[] = [];

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home onNav={navigate} />;
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
        return <Home onNav={navigate} />;
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
      <Nav current={page} onNav={navigate} />

      <main>
        {renderPage()}
      </main>

      {!noFooterPages.includes(page) && <Footer onNav={navigate} />}
    </div>
  );
}
