import { all, call } from 'redux-saga/effects';

import { shopSaga } from './shop-reducer/shop.Saga';
import { userSaga } from "./user-reducer/user.Saga";
import { cartSagas } from './cart-reducer/cart.Sagas'


export function* rootSagas() {
    yield all([
        call(shopSaga),
        call(userSaga),
        call(cartSagas)
    ]);
}