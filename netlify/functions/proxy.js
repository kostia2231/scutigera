import { createProxyMiddleware } from "http-proxy-middleware";

export const handler = async (event, context) => {
  const targetUrl = "https://4hmm5a-ih.myshopify.com/api/2024-10/graphql.json";

  const proxyMiddleware = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Убираем /api из запроса
    },
    onProxyReq: (proxyReq, req, res) => {
      // Установка заголовков, если необходимо
      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader("X-Special-Header", "foobar");
    },
    onProxyRes: (proxyRes, req, res) => {
      // Здесь можно изменить ответ от API перед тем, как отправить его клиенту
    },
  });

  // Обработка POST-запросов
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
