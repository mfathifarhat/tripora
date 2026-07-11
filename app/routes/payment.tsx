import { PaymentPage } from "../pages/payment/payment";

export function meta() {
  return [
    { title: "Secure Checkout | Tripora" },
    { name: "description", content: "Finalize your travel arrangements and secure your bookings with Tripora." },
  ];
}

export default function Payment() {
  return <PaymentPage />;
}
