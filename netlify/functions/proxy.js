import { createProxyMiddleware } from "http-proxy-middleware";

export const handler = async (event, context) => {
  const targetUrl = "https://4hmm5a-ih.myshopify.com/api/2024-10/graphql.json";
  const storefrontAccessToken = import.meta.env
    .VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

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
        storefrontAccessToken // Используем переменную среды для токена
      );
    },
    onProxyRes: (_proxyRes, _req, res) => {
      // Можно изменить ответ от API перед тем, как отправить его клиенту
      res.setHeader("Access-Control-Allow-Origin", "*"); // Настройки CORS
    },
  });

  return new Promise((resolve, reject) => {
    // Симулируем HTTP запрос в AWS Lambda
    const fakeReq = {
      method: event.httpMethod,
      url: event.path,
      headers: event.headers,
      body: event.body,
    };

    const fakeRes = {
      setHeader: (name, value) => {
        context.res.setHeader(name, value);
      },
      end: (body) => {
        resolve({
          statusCode: 200,
          body: body || "",
        });
      },
      statusCode: 200,
    };

    proxyMiddleware(fakeReq, fakeRes, (err) => {
      if (err) {
        reject({
          statusCode: 500,
          body: JSON.stringify({
            error: "Proxy middleware error",
            details: err.message,
          }),
        });
      }
    });
  });
};
