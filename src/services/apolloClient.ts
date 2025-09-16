import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const token: string = import.meta.env
  .VITE_REACT_APP_STOREFRONT_API_TOKEN as string;

console.log("token", token);

const headers: { [key: string]: string } = {
  "Content-Type": "application/json",
};

if (token) {
  headers["X-Shopify-Storefront-Access-Token"] = token;
}

const httpLink = new HttpLink({
  uri: "https://shopjoudy.myshopify.com/api/2024-01/graphql.json",
  headers,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
