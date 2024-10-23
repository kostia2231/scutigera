import https from "https";

export const handler = async (event) => {
  const body = JSON.parse(event.body); // Получаем тело запроса
  const items = body.items; // Извлекаем товары из тела запроса

  const createCartMutation = `
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

  // Преобразуем товары в формат, необходимый для создания корзины
  const lines = items.map((item) => ({
    quantity: parseInt(item.quantity),
    merchandiseId: item.id,
  }));

  const variables = {
    cartInput: {
      lines,
    },
  };

  const options = {
    hostname: "4hmm5a-ih.myshopify.com",
    path: "/api/2024-10/graphql.json",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": "fadea130624b0a2c3c6789d6e9329c01",
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        try {
          // Check if responseData is empty before parsing
          if (!responseData) {
            throw new Error("No response received from server");
          }

          const parsedData = JSON.parse(responseData);

          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({
              statusCode: res.statusCode,
              body: JSON.stringify(parsedData),
            });
          } else {
            reject({
              statusCode: res.statusCode,
              body: JSON.stringify({
                error: "Request failed",
                details: parsedData,
              }),
            });
          }
        } catch (error) {
          console.error("Error parsing response data:", error);
          reject({
            statusCode: 500,
            body: JSON.stringify({
              error: "Failed to parse response data",
              details: error.message,
            }),
          });
        }
      });
    });

    req.on("error", (error) => {
      console.error("Request error:", error);
      reject({
        statusCode: 500,
        body: JSON.stringify({
          error: "Request error",
          details: error.message,
        }),
      });
    });

    // Отправляем тело запроса (GraphQL mutation)
    req.write(JSON.stringify({ query: createCartMutation, variables }));
    req.end();
  });
};
