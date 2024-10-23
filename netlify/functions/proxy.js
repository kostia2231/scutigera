import { createProxyMiddleware } from "http-proxy-middleware";
import process from "process";
const storefrontAccessToken =
  import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const handler = async (event, context) => {
  const targetUrl = "http://4hmm5a-ih.myshopify.com/api/2024-10/graphql.json";

  const proxyMiddleware = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Убираем /api из запроса
    },
    onProxyReq: (proxyReq) => {
      // Установка заголовков, если необходимо
      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader(
        "X-Shopify-Storefront-Access-Token",
        storefrontAccessToken
      );
    },
    onProxyRes: (_proxyRes, _req, res) => {
      // Можно изменить ответ от API перед тем, как отправить его клиенту
      res.setHeader("Access-Control-Allow-Origin", "*"); // Настройки CORS
    },
  });

  return new Promise((resolve, reject) => {
    // Используем функцию для обработки запроса
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
