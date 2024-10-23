import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL_ = "https://4hmm5a-ih.myshopify.com/api/2024-10/graphql.json";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await axios.get(URL_, {
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
        });

        console.log(response.data); // Логирование ответа
        return response.data; // Вернуть данные
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
