import React from 'react';
import StripeCheckout from 'react-stripe-checkout';





const StrikeCheckoutbutton = ({ price }) => {
    const priceForStrip = price * 100;
    const publishableKey = 'pk_test_SmAGRwfJHiII90rQjenOlOr500dYmzpVq0';

    const onToken = token => { 
    console.log(token);
    alert('Payment is Successful');
}


return (
    <StripeCheckout
        label='Pay Now'
        name='Crown Clothing'
        billingAddress
        shippingAddress
        image='https://sendeyo.com/up/d/f3eb2117da'
        description={`Your Toral Price is $${price}`}
        amount={priceForStrip}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}

    />
)
};

export default StrikeCheckoutbutton;