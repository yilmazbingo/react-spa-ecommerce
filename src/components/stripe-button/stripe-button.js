import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = process.env.STRIPE_PUBLIC_API_KEY;
  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: { amount: priceForStripe, token: token },
    })
      .then((response) => {
        alert("payment was successful");
      })
      .catch((error) => {
        console.log("payment error", JSON.parse(error));
        alert("there was issue with your payment");
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="BINGO Wear"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      amount={priceForStripe}
      description={`Your total is $${price} `}
      panelLabel="Payment time"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
