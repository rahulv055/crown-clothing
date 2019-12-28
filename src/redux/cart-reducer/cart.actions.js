import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => (
    {
        type: CartActionTypes.TOGGLE_CART_HIDDEN
    }
)

export const addItem = (item) => {
    return {
        type:CartActionTypes.ADD_TO_CART,
        payload:item
    }
}

export const removeItem = (item) => {
    return {
        type:CartActionTypes.REMOVE_CART_ITEM,
        payload:item
    }
}