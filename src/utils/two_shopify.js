import { default as fetch } from "node-fetch";

export const postToShopify = async ({ query, variables = {} }) => {
  try {
    const result = await fetch(import.meta.env.VITE_SHOPIFY_STORE_DOMAIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": import.meta.env
          .VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());

    if (result.errors) {
      console.log({ errors: result.errors });
    } else if (!result || !result.data) {
      console.log({ result });
      return "No results found.";
    }

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
