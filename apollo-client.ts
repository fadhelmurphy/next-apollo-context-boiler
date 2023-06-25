import { ApolloClient, InMemoryCache } from "@apollo/client";

const ApolloState = new ApolloClient({
    uri: "https://graphql.anilist.co",
    cache: new InMemoryCache(),
});

export default ApolloState;