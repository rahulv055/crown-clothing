import React from 'react';
import { connect } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assests/shopping-bag.svg";
import { toggleCartHidden } from "../../redux/cart-reducer/cart.actions";
import { selectCartItemCount } from "../../redux/cart-reducer/cart.selectors";
import './cart-icon.styles.scss';

// function countItems(cartItems) {
//     let count = 0;
//     cartItems.forEach(element => {
//         count = count + element.quantity;
//     });
//     return count;
// }

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon" />
        <span className="item-count">{itemCount}</span>
    </div>
)

const mapStateToProps = (state) => {
    // cartItems: state.cart.cartItems
    return {
        itemCount: selectCartItemCount(state)
    }
}

const mapsDipatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps, mapsDipatchToProps)(CartIcon);