import { createProxyMiddleware } from "http-proxy-middleware";

const storefrontAccessToken = "fadea130624b0a2c3c6789d6e9329c01"; // Ваш токен доступа

export const handler = async (event, context) => {
  const targetUrl = "https://4hmm5a-ih.myshopify.com/api/2024-10/graphql.json"; // URL Shopify

  const proxyMiddleware = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Убираем /api из запроса
    },
    onProxyReq: (proxyReq, req) => {
      // Установка заголовков для запроса
      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader(
        "X-Shopify-Storefront-Access-Token",
        storefrontAccessToken
      );

      // Если запрос содержит тело, добавьте его
      if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.write(bodyData);
      }
    },
    onProxyRes: (_proxyRes, _req, res) => {
      // Настройки CORS
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, X-Shopify-Storefront-Access-Token"
      );
    },
  });

  return new Promise((resolve, reject) => {
    // Обработка запроса
    proxyMiddleware(event, context, (err) => {
      if (err) {
        reject({
          statusCode: 500,
          body: JSON.stringify({
            error: "Proxy middleware error",
            details: err.message,
          }),
        });
      } else {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: "Proxy middleware executed" }),
        });
      }
    });
  });
};
