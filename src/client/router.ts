import Home from "./pages/Home.svelte";
import About from "./pages/About.svelte";
import AboutAnotherTest from "./pages/AboutAnotherTest.svelte";
import AboutTest from "./pages/AboutTest.svelte";

export default {
  "/": Home,
  "/about": About,
  "/about/:test": AboutTest,
  "/about/:test/:anotherTest": AboutAnotherTest,
};
