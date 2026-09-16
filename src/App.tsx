import { HashRouter, Route, Routes } from "react-router-dom";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageTransition, PageTransitionProvider } from "@/components/PageTransition";
import { Navigation } from "@/components/Navigation";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { Home } from "@/pages/Home";
import { WorkPage } from "@/pages/Work";
import { ProjectPage } from "@/pages/Project";
import { AboutPage } from "@/pages/About";
import { AwardsPage } from "@/pages/Awards";
import { JournalPage } from "@/pages/Journal";
import { ArticlePage } from "@/pages/Article";
import { NotFound } from "@/pages/NotFound";

/**
 * Hash-based routing keeps deep links working when the built single file is
 * served without server-side rewrites.
 */
export default function App() {
  return (
    <HashRouter>
      <SmoothScroll>
        <PageTransitionProvider>
          <a
            href="#main"
            onClick={(e) => {
              e.preventDefault();
              const main = document.getElementById("main");
              main?.focus();
              main?.scrollIntoView();
            }}
            className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
          >
            Skip to content
          </a>
          <Navigation />
          <Cursor />
          <PageTransition>
            <main id="main" tabIndex={-1} className="outline-none">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="/work/:slug" element={<ProjectPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/awards" element={<AwardsPage />} />
                <Route path="/journal" element={<JournalPage />} />
                <Route path="/journal/:slug" element={<ArticlePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </PageTransition>
        </PageTransitionProvider>
      </SmoothScroll>
    </HashRouter>
  );
}
