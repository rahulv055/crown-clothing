import { all, call, takeLatest, put } from 'redux-saga/effects';


import  UserActionTypes  from '../../redux/user-reducer/user.types';
import { clearCart } from './cart.actions';


export function* clearCartonSignOut() {
    yield put(clearCart())
}



export function* onSignOutSucess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartonSignOut)
}

export function* cartSagas(){
    yield all([call(onSignOutSucess)])
}