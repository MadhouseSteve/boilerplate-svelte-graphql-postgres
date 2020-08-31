import App from "./App.svelte";
import gqlClient from "./graphql";

new App({ target: document.body, props: { gqlClient } });
