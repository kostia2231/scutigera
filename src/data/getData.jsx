import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const storefrontAccessToken = import.meta.env
  .VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await axios.post(
          "https://idyllic-concha-a54637.netlify.app/.netlify/functions/proxy/api/2024-10/graphql.json",
          {
            query: `
              {
                products(first: 10) {
                  edges {
                    node {
                      id
                      title
                      priceRange {
                        minVariantPrice {
                          amount
                        }
                      }
                      featuredImage {
                        url
                        altText
                      }
                      variants(first: 10) {
                        edges {
                          node {
                            id
                            title
                            priceV2 {
                              amount
                              currencyCode
                            }
                            availableForSale
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
            },
          }
        );
        
        return response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products.");
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    onError: (error) => {
      console.log("Error fetching products: ", error);
    },
  });
};
