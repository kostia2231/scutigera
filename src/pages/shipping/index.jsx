export default function Shipping() {
  return (
    <div className="grid grid-cols-2 max-[640px]:grid-cols-1 p-20 max-[640px]:p-0 max-[640px]:pt-20 max-[640px]:flex-col min-[1275px]:px-[100px] max-[640px]:px-4">
      <div></div>
      <div className="pl-2 max-[640px]:pl-0">
        <div className="font-bold">SHIPPING</div>
        <div className="flex flex-col">
          <div>
            Free shipping on all orders to Germany.
            <br />
            Free shipping on all orders to the EU above €100.
          </div>
          <br />
          <div className="font-bold uppercase">Estimated delivery times</div>
          <div>
            Germany: 1–3 business days.
            <br />
            EU: 2–5 business days.
            <br />
            Rest of the world: 5–14 business days.
          </div>
          <br />
          <div>
            Shipping costs are calculated at checkout. Orders are shipped from
            Germany via reliable courier services. Order processing takes 1
            business day before shipping. Please note that additional customs
            duties or fees may be charged depending on the destination country.
            These charges are the customer’s responsibility. We recommend
            checking your local regulations before placing an order.
          </div>
          <br />
          <div className="font-bold">RETURNS</div>
          <div>
            We accept returns within 14 days of receiving your order. If you
            would like to request a return, please contact us at{" "}
            <a
              className="pointer underline-offset-[3px] decoration-[1.5px] active:opacity-70 underline"
              href="mailto:info@scutigera.online"
            >
              info@scutigera.online
            </a>{" "}
            to receive return instructions.
            <br /> <br />
            <div>
              The item must be in its original condition, free from signs of
              wear, use, stains, or damage. All tags, labels, and packaging must
              be intact. Refunds will be processed within 14 days after we
              receive the returned item. The customer is responsible for the
              return shipping costs.
            </div>
            <br />
            <div>
              Items marked as FINAL SALE cannot be returned or refunded. Please
              check product details before purchasing.
            </div>
            <br />
            <div>
              Once your return request is received, we will provide detailed
              instructions, including the return address.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
