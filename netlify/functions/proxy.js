import { createProxyMiddleware } from "http-proxy-middleware";

const storefrontAccessToken = "fadea130624b0a2c3c6789d6e9329c01";

export const handler = async (event, context) => {
  const targetUrl = "http://4hmm5a-ih.myshopify.com/api/2024-10/graphql.json";

  const proxyMiddleware = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Убираем /api из запроса
    },
    onProxyReq: (proxyReq, req) => {
      // Логируем информацию о запросе
      console.log("Original request URL:", req.url); // Логируем оригинальный URL запроса
      console.log("Target URL:", targetUrl); // Логируем целевой URL

      // Установка заголовков, если необходимо
      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader(
        "X-Shopify-Storefront-Access-Token",
        storefrontAccessToken
      );
    },
    onProxyRes: (_proxyRes, _req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*"); // Настройки CORS
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, X-Shopify-Storefront-Access-Token"
      ); // Разрешаем заголовки
    },
  });

  return new Promise((resolve, reject) => {
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
