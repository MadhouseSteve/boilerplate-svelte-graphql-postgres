<script lang="typescript">
  import { getContext } from "svelte";
  import { gql } from "apollo-boost";
  import { GraphQL } from "../graphql";

  const query = gql`
    {
      books {
        title
        author
      }
    }
  `;

  const graphql = getContext<GraphQL>("graphql");
  graphql.query({ query });
</script>

Homepage
