import https from "https";

export const handler = async () => {
  const query = `
    {
      products(first: 10, sortKey: PRODUCT_TYPE, reverse: false) {
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
  `;

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
        resolve({
          statusCode: res.statusCode,
          body: responseData,
        });
      });
    });

    req.on("error", (error) => {
      reject({
        statusCode: 500,
        body: JSON.stringify({
          error: "Request error",
          details: error.message,
        }),
      });
    });

    req.write(JSON.stringify({ query }));
    req.end();
  });
};
