import React from "react";
import { connect } from "react-redux";
import CustomButton from '../custom-button/custom-button.components';
import CartItem from '../../components/cart-item/cart-item.components'
import { selectCartItems } from "../../redux/cart-reducer/cart.selectors";
import './cart-dropdown.styles.scss'

const CartDropdown = ({ cartItems }) => (

    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ?
                    (cartItems.map(cartItem =>
                        (<CartItem key={cartItem.id} items={cartItem} />)
                    ))
                    : (
                        <span className="empty-message">YOUR CART IS EMPTY</span>
                    )
            }
        </div>
        <CustomButton>GO TO CHECKOUTS</CustomButton>
    </div>

)

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
})

export default connect(mapStateToProps)(CartDropdown);