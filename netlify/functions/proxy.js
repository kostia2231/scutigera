import { createProxyMiddleware } from "http-proxy-middleware";

export const handler = async (event, context) => {
  console.log("Function invoked");

  const targetUrl = "https://4hmm5a-ih.myshopify.com/api/2024-10/graphql.json";

  try {
    const proxyMiddleware = createProxyMiddleware({
      target: targetUrl,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
      onProxyReq: (proxyReq, req) => {
        console.log("Proxying request to:", targetUrl);
        console.log("Original request URL:", req.url);

        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader(
          "X-Shopify-Storefront-Access-Token",
          import.meta.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
        );
      },
      onProxyRes: (_proxyRes, _req, res) => {
        console.log("Received response from Shopify API");
        res.setHeader("Access-Control-Allow-Origin", "*");
      },
    });

    return new Promise((resolve, reject) => {
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
          console.error("Proxy error:", err);
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
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server error",
        details: error.message,
      }),
    };
  }
};
