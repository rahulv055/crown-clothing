import ShopActionTypes from "./shop.types";

const INTIAL_STATE = {
    collections: null,
    isLoading:false,
    errorMessage:undefined
}


const shopReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case ShopActionTypes.FETCH_COLLECTION_START:
            return {
                ...state,
                isLoading:true
            }
        case ShopActionTypes.FETCH_COLLECTION_FAILURE:
            return {
                ...state,
                isLoading: false,
            }
            case ShopActionTypes.FETCH_COLLECTION_SUCCESS:
                return {
                    ...state,
                    collections: action.payload,
                    isLoading: false,
                }
        default:
            return state;
    }
}

export default shopReducer;