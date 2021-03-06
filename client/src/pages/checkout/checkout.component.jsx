import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import './checkout.styles.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item-component'
import { selectCartItems, selectCartTotal } from "../../redux/cart-reducer/cart.selectors";
import StrikeCheckoutbutton from '../../components/stripe-button/stripe-button.components';


const Checkout = ({ cartItems, total }) => (

    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cart =>
                <CheckoutItem key={cart.id} cartItem={cart} />
            )
        }
        <div className="total">
            <span>TOTAL:${total}</span>
        </div>
        <div className='test-warning'>
            *Please Use Following Test Credit Card for Payment*
            <br/>
            4242 4242 4242 4242 - Exp: 01/20 - CVV : 123
        </div>
        <StrikeCheckoutbutton price={total}/>
    </div>
);

const MapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal

})

export default connect(MapStateToProps)(Checkout);