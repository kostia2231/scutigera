import { useEffect, useState } from "react";

export default function Terms() {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      setTime(formattedTime);
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-2 max-[640px]:grid-cols-1 p-20 max-[640px]:p-0 max-[640px]:pt-20 max-[640px]:flex-col min-[1275px]:px-[100px] max-[640px]:px-4">
      <div></div>
      <div className="pl-2 max-[640px]:pl-0">
        <div className="font-bold">PRIVACY POLICY</div>
        <div className="opacity">
          Effective Date: {formattedDate}, {time}.
        </div>
        <div>
          This Privacy Policy describes how we collect, use, and protect your
          personal information when you visit or make a purchase from our
          website.
        </div>
        <br />
        <div className="font-bold">DATA WE COLLECT </div>
        <div>
          When you place an order, we collect certain personal information from
          you, including your name, billing and shipping address, email address,
          and payment details. This information is necessary to process and
          fulfill your order.
        </div>
        <br />
        <div>
          Additionally, Shopify, the platform we use to run our store,
          automatically collects certain technical information, such as your IP
          address, browser type, and device information. This data is used to
          ensure the proper functionality of the website and checkout process.
        </div>
        <br />
        <div className="font-bold">PAYMENT PROCESSING</div>
        <div>
          All payments on our website are processed securely through Shopify
          Payments. We do not store or have access to your payment card details.
          Shopify Payments processes all transactions in accordance with its own
          privacy and security policies. For more details, you can review
          Shopify’s Privacy Policy{" "}
          <a
            className="pointer underline-offset-[3px] decoration-[1.5px] active:opacity-70 underline"
            href="https://www.shopify.com/legal/privacy"
          >
            here
          </a>
          .
        </div>
        <br />
        <div className="font-bold">COOKIES AND SITE TRACKING</div>
        <div>
          Our website uses only essential cookies that are required for basic
          functionality, such as adding items to your cart and completing
          checkout. We do not use third-party tracking, advertising, or
          analytics services. Because only essential cookies are used, no cookie
          consent banner is required.
        </div>
        <br />
        <div className="font-bold">HOW WE USE YOUR INFORMATION </div>
        <div>
          We use the personal information you provide solely to:
          <br />
          • Process and ship your orders.
          <br />
          • Send you order confirmations and tracking details.
          <br />
          • Respond to customer service inquiries.
          <br /> <br />
          We do not use your information for marketing emails or newsletters.
        </div>
        <br />
        <div className="font-bold">SHARING YOUR INFORMATION</div>
        <div>
          We do not sell, rent, or share your personal information with third
          parties except as necessary to fulfill your order (e.g., providing
          your shipping address to courier services). Shopify acts as our data
          processor and handles all necessary data in accordance with GDPR.
        </div>
        <br />
        <div className="font-bold">YOUR RIGHTS UNDER GDPR</div>
        <div>
          If you are located in the European Union, you have the right to
          access, correct, or delete your personal data. If you wish to make
          such a request, please contact us at{" "}
          <a
            className="pointer underline-offset-[3px] decoration-[1.5px] active:opacity-70 underline"
            href="mailto:info@scutigera.online"
          >
            info@scutigera.online
          </a>
          .
        </div>
        <br />
        <div className="font-bold">CHANGES TO THIS PRIVACY POLICY</div>
        <div>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page.
        </div>
        <br />
        <div className="font-bold">SECURITY OF PERSONAL DATA</div>
        <div>
          We implement reasonable security measures to protect your personal
          information from unauthorized access or disclosure.
        </div>
        <br />
        <div className="font-bold">CONTACT US</div>
        <div>
          If you have any questions about this Privacy Policy or how your
          personal data is handled, please contact us at{" "}
          <a
            className="pointer underline-offset-[3px] decoration-[1.5px] active:opacity-70 underline"
            href="mailto:info@scutigera.online"
          >
            info@scutigera.online
          </a>
          .
          {/* <br />
          <br />
          <div className="font-bold">LEGAL INFORMATION</div>
          <div>
            Individual Entrepreneur Parkhomenko Mariia Romanivna
            <br />
            36A Lyudviga Svobody Avenue, 61000 Kharkiv, Ukraine
            <br />
            +380738248051
          </div> */}
        </div>
      </div>
    </div>
  );
}
