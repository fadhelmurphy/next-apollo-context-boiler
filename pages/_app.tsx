import ApolloState from "@/apollo-client";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Context from 'Store/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={ApolloState}>
      <Context>
      <Component {...pageProps} />
      </Context>
    </ApolloProvider>
  );
}
