import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const container = document.getElementById("root")!;
// Static routes (month and year hubs) exist only as pre-rendered HTML and ship
// without the app bundle; if it is ever loaded on one, leave the page alone.
const isStaticPage = container.hasAttribute("data-static");
// Route entrypoints ship a pre-rendered HTML snapshot inside #root so crawlers
// that do not execute JS still see the page's content (see
// scripts/build-route-pages.mjs). Drop it before mounting — the app owns the
// container from here.
if (!isStaticPage) {
  container.replaceChildren();
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
