import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Button } from "@mui/material";
import "./paymentForm.css";
import { Product, CartItem } from "../../types/types";
interface CheckOutFormProps {
  products: Product[];
  selectedProduct: Product | null;
  open: string | boolean;
  handleClose: () => void;
  cartItems: CartItem[]; //Coming from types
}

const stripePromise: Promise<Stripe | null> = loadStripe(
  "pk_test_51NdRuiHXG7QNx5YvJW5srReijc18q3AKbgVh6Htf1fCEHEfoImMCc1RiPDnCaCO6dmtgHManGjb28IoBzBWO1Mc700UehlUman"
);

const CheckOutForm: React.FC<CheckOutFormProps> = ({ cartItems }) => {
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:4243/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item: cartItems,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data?.clientSecret));
  }, [cartItems]);

  //
  interface Appearance {
    theme: "night" | "stripe" | "flat" | undefined;
  }
  const appearance: Appearance = {
    theme: "night",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={options}>
        <PaymentForm />
      </Elements>
    )
  );
};

const PaymentForm: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmParams = {
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/paymentdone",
      },
    };

    const { error } = await stripe.confirmPayment(confirmParams);
    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error?.message || "Error occur");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        type="submit"
        sx={{
          backgroundColor: "black",
          color: "white",
          margin: "10px",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : `Pay Now`}
        </span>
      </Button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckOutForm;
