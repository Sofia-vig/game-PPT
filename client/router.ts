import { Router } from "@vaadin/router";

//Pages
import "./pages/home";
import "./pages/name";
import "./pages/insert-code";
import "./pages/code";
import "./pages/instructions";
import "./pages/waiting";
import "./pages/game";
import "./pages/result";
import "./pages/error";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/code", component: "code-page" },
  { path: "/new-code", component: "insert-code" },

  {
    path: "/name",
    component: "name-page",
  },
  { path: "/instructions", component: "instructions-page" },
  { path: "/waiting", component: "waiting-page" },
  { path: "/game", component: "game-page" },
  { path: "/result", component: "result-page" },
  { path: "/error", component: "error-page" },
]);
