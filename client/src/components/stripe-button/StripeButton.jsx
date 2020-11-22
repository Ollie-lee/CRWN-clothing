import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export default function StripeButton({ price }) {
  const priceForStripe = price * 100; // price wants cents
  const publishableKey =
    'pk_test_51Hmn2IISwTDjXH22DmSDiRBZWqfoO1UFu7bQAUjaIF8HdTsoYXmftEXah7sl4h5G7JPPEACFIIEPWS8daALYm0Tl00uWOd2qS7';

  const onToken = (token) => {
    // with the token you would pass this to your backend
    //Which then creates the charge.

    //send a post request
    axios({
      // make a request to our own to '/payment', which is what we set up in our server.js
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((res) => {
        alert('payment successful');
      })
      .catch((error) => {
        console.log('Payment error: ', JSON.parse(error));
        alert(
          'Sorry, payment failed. Please ensure your provided information is correct'
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN clothing Ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      //callback for successful payments
      token={onToken}
      stripeKey={publishableKey}
      alipay
    />
  );
}
