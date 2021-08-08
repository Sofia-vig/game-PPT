import { Router } from "@vaadin/router";

//Pages
import "./pages/home";
import "./pages/new-room";
import "./pages/existent-room";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/existent-room", component: "existent-room" },
  {
    path: "/new-room",
    component: "new-room",
  },
]);
