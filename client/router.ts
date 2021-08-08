import { Router } from "@vaadin/router";

//Pages
import "./pages/home";
import "./pages/name";
import "./pages/insert-code";
import "./pages/code";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/code", component: "code-page" },
  { path: "/new-code", component: "insert-code" },

  {
    path: "/name",
    component: "name-page",
  },
]);
