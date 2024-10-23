import https from "https";

export const handler = async (event) => {
  const data = JSON.stringify({
    query: event.body.query, // Получаем запрос из тела события
  });

  const options = {
    hostname: "4hmm5a-ih.myshopify.com",
    path: "/api/2024-10/graphql.json",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": import.meta.env
        .SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      "Content-Length": data.length,
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

    req.write(data);
    req.end();
  });
};
