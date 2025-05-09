import { gql, GraphQLClient } from "graphql-request";

const storefrontAccessToken = import.meta.env
  .VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const graphQLClient = new GraphQLClient(
  "https://4hmm5a-ih.myshopify.com/api/2024-10/graphql.json",
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
  }
);

export async function getProducts() {
  const getAllProductsQuery = gql`
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            featuredImage {
              altText
              url
            }
          }
        }
      }
    }
  `;
  try {
    return await graphQLClient.request(getAllProductsQuery);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addToCart(items) {
  const createCartMutation = gql`
    mutation createCart($cartInput: CartInput!) {
      cartCreate(input: $cartInput) {
        cart {
          id
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
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Invalid items input: must be a non-empty array");
  }

  const lines = items.map((item) => {
    if (!item.id || !item.quantity) {
      throw new Error("Each item must have an id and quantity");
    }
    return {
      quantity: parseInt(item.quantity, 10),
      merchandiseId: item.id,
    };
  });

  const variables = {
    cartInput: {
      lines,
    },
  };

  // console.log(
  //   "Variables for cart creation:",
  //   JSON.stringify(variables, null, 2)
  // );

  try {
    const result = await graphQLClient.request(createCartMutation, variables);

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      throw new Error(
        "GraphQL errors occurred: " + JSON.stringify(result.errors)
      );
    }

    // console.log("Cart creation result:", JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw new Error("Failed to create cart. " + error.message);
  }
}

export async function updateCart(cartId, itemId, quantity) {
  const updateCartMutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartId: cartId,
    lines: [
      {
        quantity: parseInt(quantity),
        merchandiseId: itemId,
      },
    ],
  };
  try {
    return await graphQLClient.request(updateCartMutation, variables);
  } catch (error) {
    throw new Error(error);
  }
}

export async function retrieveCart(cartId) {
  const cartQuery = gql`
    query cartQuery($cartId: ID!) {
      cart(id: $cartId) {
        id
        createdAt
        updatedAt

        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
          }
        }
      }
    }
  `;
  const variables = {
    cartId,
  };
  try {
    const data = await graphQLClient.request(cartQuery, variables);
    return data.cart;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCheckoutUrl = async (cartId) => {
  const getCheckoutUrlQuery = gql`
    query checkoutURL($cartId: ID!) {
      cart(id: $cartId) {
        checkoutUrl
      }
    }
  `;
  const variables = {
    cartId: cartId,
  };
  try {
    return await graphQLClient.request(getCheckoutUrlQuery, variables);
  } catch (error) {
    throw new Error(error);
  }
};
