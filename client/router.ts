import { Router } from "@vaadin/router";

//Pages
import "./pages/home";
import "./pages/new-room";
import "./pages/existent-room";
import "./pages/code";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/existent-room", component: "existent-room" },
  { path: "/code", component: "code-page" },

  {
    path: "/new-room",
    component: "new-room",
  },
]);
