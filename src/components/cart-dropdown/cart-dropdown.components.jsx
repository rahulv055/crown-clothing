import React from "react";
import { connect } from "react-redux";
import CustomButton from '../custom-button/custom-button.components';
import CartItem from '../../components/cart-item/cart-item.components'

import './cart-dropdown.styles.scss'

const CartDropdown = ({ cartItems }) => (

    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.map(cartItem =>
                    (<CartItem key={cartItem.id} items={cartItem} />)
                )
            }
        </div>
        <CustomButton>GO TO CHECKOUTS</CustomButton>
    </div>

)

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems
})

export default connect(mapStateToProps)(CartDropdown);