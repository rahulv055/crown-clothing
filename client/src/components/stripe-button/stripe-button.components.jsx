import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';





const StrikeCheckoutbutton = ({ price }) => {
    const priceForStrip = price * 100;
    const publishableKey = 'pk_test_SmAGRwfJHiII90rQjenOlOr500dYmzpVq0';

    const onToken = token => {
        console.log(token);

        // try {
        //     const response = await axios.post('/payment', { data });
        //     console.log(response.status);
        //     if (response.status === 200)
        //         alert('Payment is Successful');
        // } catch (error) {
        //     console.log('Payment err: ', JSON.parse(error));
        // }

        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStrip,
                token: token
            }
        })
            .then(response => {
                alert('succesful payment');
                console.log(response);
            })
            .catch(error => {
                console.log('Payment Error: ', error);
                alert(
                    'There was an issue with your payment! Please make sure you use the provided credit card.'
                );
            });
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