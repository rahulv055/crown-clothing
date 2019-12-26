import React from 'react';
import { connect } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assests/shopping-bag.svg";
import { toggleCartHidden } from "../../redux/cart-reducer/cart.actions";
import './cart-icon.styles.scss';

function countItems(cartItems) {
    let count = 0;
    cartItems.forEach(element => {
        count = count + element.quantity;
    });
    return count;
}

const CartIcon = ({ toggleCartHidden, cartItems }) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon" />
        <span className="item-count">{countItems(cartItems)}</span>
    </div>
)

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems
})

const mapsDipatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps, mapsDipatchToProps)(CartIcon);