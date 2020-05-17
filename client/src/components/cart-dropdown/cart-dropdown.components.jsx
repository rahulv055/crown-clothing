import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CustomButton from '../custom-button/custom-button.components';
import CartItem from '../../components/cart-item/cart-item.components'
import { selectCartItems } from "../../redux/cart-reducer/cart.selectors";
import { toggleCartHidden } from "../../redux/cart-reducer/cart.actions";
import './cart-dropdown.styles.scss'

const CartDropdown = ({ cartItems, history, dispatch }) => (

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
        <CustomButton onClick={() => {
            history.push('/checkout')
            dispatch(toggleCartHidden())
        }}>GO TO CHECKOUTS</CustomButton>
    </div>

)

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
})

export default withRouter(connect(mapStateToProps)(CartDropdown));