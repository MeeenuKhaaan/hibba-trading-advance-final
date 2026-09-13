import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router does NOT reset scroll position on navigation by default —
 * so clicking "View" on a product, or any nav link, kept whatever scroll
 * position the previous page was at (often showing the new page's bottom).
 * This scrolls to the top instantly whenever the route (path) changes.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
