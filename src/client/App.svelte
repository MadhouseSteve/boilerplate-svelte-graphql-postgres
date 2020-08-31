<script lang="typescript">
  import { ApolloClient, gql } from "apollo-boost";

  export let gqlClient: ApolloClient<unknown>;

  const query = gql`
    {
      books {
        title
        author
      }
    }
  `;

  const subscriptionQuery = gql`
    subscription {
      bookAdded {
        title
        author
      }
    }
  `;

  interface Book {
    title: string;
    author: string;
  }

  let books = [];

  const response = gqlClient.query<{ books: Book[] }>({ query });
  response.then((data) => (books = data.data.books));

  const subscription = gqlClient.subscribe<{ bookAdded: Book }>({
    query: subscriptionQuery,
  });
  subscription.subscribe((data) => {
    books.push(data.data.bookAdded);
    books = books;
  });
</script>

<style>
  :global(body) {
    background-color: #212121;
    color: #f0eded;
  }
</style>

{#each books as book}
  <p>{book.title} by {book.author}</p>
{/each}
