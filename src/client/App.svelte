<script lang="typescript">
  import Error404 from "./pages/errors/Error404.svelte";

  import { setContext } from "svelte";
  import { GraphQL } from "./graphql";

  export let gqlClient: GraphQL;
  setContext("graphql", gqlClient);

  import router from "./router";

  const route = Object.keys(router)
    .map((m) => {
      const params = m.match(/:[^\s/]+/g);
      let routeMatcher = new RegExp(
        "^" + m.replace(/:[^\s/]+/g, "([\\w-]+)") + "$"
      );
      const match = window.location.pathname.match(routeMatcher);
      if (match) {
        let filledParams = {};
        if (params) {
          for (let i = 0; i < params.length; i++) {
            filledParams[params[i].substr(1)] = match[i + 1];
          }
        }

        return {
          Component: router[m],
          Params: filledParams,
        };
      } else {
        return null;
      }
    })
    .filter((m) => m);

  const Component = route.length ? route[0].Component : null;
  const ComponentParams = route.length ? route[0].Params : null;
</script>

<style>
  :global(body) {
    background-color: #212121;
    color: #f0eded;
  }
</style>

{#if Component}
  <Component {...ComponentParams} />
{:else}
  <Error404 />
{/if}
