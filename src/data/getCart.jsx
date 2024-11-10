import axios from "axios";

const SHOPIFY_API_URL =
  "https://4hmm5a-ih.myshopify.com/api/2024-10/graphql.json";
const SHOPIFY_ACCESS_TOKEN = "fadea130624b0a2c3c6789d6e9329c01";

export async function fetchCart(cartId) {
  const query = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                product {
                  title
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

  try {
    const response = await axios.post(
      SHOPIFY_API_URL,
      {
        query,
        variables: { cartId },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка запроса:", error);
    throw error;
  }
}
