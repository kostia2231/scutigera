import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
      <motion.div
        style={{ willChange: "opacity, transform" }}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="pl-2 max-[640px]:pl-0"
      >
        <div className="font-bold">TERMS</div>
        <div className="opacity-20">
          Effective Date: {formattedDate}, {time}
        </div>
        <div>
          These Terms of Use (&quot;Terms&quot;) are a legal agreement between
          you and www.scutigera.online (the &quot;Site&quot;,
          &quot;SCUTIGERA&quot;, &quot;we&quot;, &quot;us&quot; or
          &quot;our&quot;). The Site collects, uses, and discloses your personal
          information when you visit, use our services, or make a purchase from
          www.scutigera.online or otherwise communicate with us regarding the
          Site (collectively, the &quot;Services&quot;). For the purposes of
          this Privacy Policy, &quot;you&quot; and &quot;your&quot; refer to you
          as the user of the Services, whether you are a customer, website
          visitor, or another individual whose information we have collected
          pursuant to this Privacy Policy. Please read these Terms carefully.
        </div>
        <br />
        <div className="font-bold">SHIPPING</div>
        <div className="flex flex-col">
          <p>EUROPEAN UNION</p>
          <p>€15 Small package</p>
          <p>€17 Large package</p>
          <p>3-7 business days</p>
          <br />
          <p>GERMANY</p>
          <p>€7</p>
          <p>3-5 business days</p>
          <br />
          <p>EUROPE (NON-EU)</p>
          <p>€30</p>
          <p>5-7 business days</p>
          <br />
          <p>UNITED STATES</p>
          <p>€20 Small package</p>
          <p>€35 Large package</p>
          <p>5-7 business days</p>
          <br />
          <p>UKRAINE</p>
          <p>€15</p>
          <p>5-10 business days</p>
          <br />
          <div>
            Free shipping within the EU for orders over €130. You will receive a
            tracking number via email as soon as your order is processed,
            usually within 48 hours.
          </div>
          <br />
          <div className="font-bold">RETURNS</div>
          <div>
            We accept returns within 14 days of receiving your order, provided
            the item is in its original condition, with tags attached, and has
            not been worn. Please note that shipping costs are non-refundable.
            Refunds will be processed within 14 days of receiving the returned
            item and will be issued to the original payment method used for the
            purchase. If you have any questions, please contact our customer
            service team for further assistance.
            <br />
            <a
              className="pointer underline-offset-[3px] decoration-[1.5px] active:opacity-70 underline"
              href="mailto:info@scutigera.online"
            >
              info@scutigera.online
            </a>
          </div>
        </div>
        <br />
        <div className="font-bold">
          HOW WE COLLECT AND USE YOUR PERSONAL DATA
        </div>
        <div>
          To provide the Services, we collect personal information about you
          from a variety of sources, as set out below. The information that we
          collect and use varies depending on how you interact with us. In
          addition to the specific uses set out below, we may use information we
          collect about you to communicate with you, provide or improve or
          improve the Services, comply with any applicable legal obligations,
          enforce any applicable terms of service, and to protect or defend the
          Services, our rights, and the rights of our users or others.
        </div>
        <br />
        <div className="font-bold">WHAT PERSONAL DATA WE COLLECT</div>
        <div>
          The types of personal information we obtain about you depends on how
          you interact with our Site and use our Services. When we use the term
          &quot;personal information&quot;, we are referring to information that
          identifies, relates to, describes or can be associated with you. The
          following sections describe the categories and specific types of
          personal information we collect.
        </div>
        <br />
        <div className="font-bold">DATA WE COLLECT DIRECTLY FROM YOU</div>
        <div>
          <ul>
            <li>
              -- Contact details including your name, address, phone number, and
              email.
            </li>
            <li>
              -- Order information including your name, billing address,
              shipping address, payment confirmation, email address, and phone
              number.
            </li>
            <li>
              -- Account information including your username, password, security
              questions and other information used for account security
              purposes.
            </li>
            <li>
              -- Customer support information including the information you
              choose to include in communications with us, for example, when
              sending a message through the Services.
            </li>
          </ul>
          <div>
            Some features of the Services may require you to directly provide us
            with certain information about yourself. You may elect not to
            provide this information, but doing so may prevent you from using or
            accessing these features.
          </div>
        </div>
        <br />
        <div className="font-bold">
          LEGAL BASIS FOR PROCESSING PERSONAL DATA
        </div>
        <div>
          We process your personal data based on your consent, the necessity of
          processing for the performance of a contract, compliance with legal
          obligations, and legitimate interests pursued by us or a third party.
        </div>
        <br />
        <div className="font-bold">COOKIES AND SIMILAR TECHNOLOGIES</div>
        <div>
          We use cookies and similar technologies to enhance your experience on
          our Site. You can manage your cookie preferences through your browser
          settings.
        </div>
        <br />
        <div className="font-bold">DATA RETENTION</div>
        <div>
          We will retain your personal information for as long as necessary to
          fulfill the purposes outlined in this Privacy Policy or as required by
          law.
        </div>
        <br />
        <div className="font-bold">USER RIGHTS</div>
        <div>
          You have the right to access, correct, or delete your personal
          information. You can also object to the processing of your data under
          certain conditions.
        </div>
        <br />
        <div className="font-bold">SECURITY OF PERSONAL DATA</div>
        <div>
          We implement reasonable security measures to protect your personal
          information from unauthorized access or disclosure.
        </div>
        <br />
        <div className="font-bold">CHANGES TO THIS PRIVACY POLICY</div>
        <div>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on our Site.
        </div>
        <br />
        <div className="font-bold">CONTACT US</div>
        <div>
          If you have any questions about this Privacy Policy or our practices
          regarding your personal information, please contact us at:
          <br />
          <a
            className="pointer underline-offset-[3px] decoration-[1.5px] active:opacity-70 underline"
            href="mailto:info@scutigera.online"
          >
            info@scutigera.online
          </a>
        </div>
      </motion.div>
    </div>
  );
}
