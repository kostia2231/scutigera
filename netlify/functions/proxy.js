import { createProxyMiddleware } from "http-proxy-middleware";
const storefrontAccessToken = "fadea130624b0a2c3c6789d6e9329c01";

export const handler = async (event, context) => {
  const targetUrl = "https://4hmm5a-ih.myshopify.com/api/2024-10/graphql.json";

  const proxyMiddleware = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
    onProxyReq: (proxyReq, req) => {
      console.log("Original request URL:", req.url);
      console.log("Target URL:", targetUrl);

      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader(
        "X-Shopify-Storefront-Access-Token",
        storefrontAccessToken
      );
    },
    onProxyRes: (_proxyRes, _req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, X-Shopify-Storefront-Access-Token"
      );
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
