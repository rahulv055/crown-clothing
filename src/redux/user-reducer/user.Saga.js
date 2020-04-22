import { takeLatest, call, put, all } from "redux-saga/effects";

import UserActionTypes from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.utils";
import { SignInSuccess, SignInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from "./user.actions";

export function* getSnapshotFromUser(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData)
        const snapshot = yield userRef.get();
        yield put(
            SignInSuccess({ id: snapshot.id, ...snapshot.data() })
        )
    } catch (error) {
        yield put(
            SignInFailure(error.message)
        )
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield call(getSnapshotFromUser, user)
    } catch (error) {
        yield put(
            SignInFailure(error.message)
        )
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield call(getSnapshotFromUser, user)
    } catch (error) {
        yield put(
            SignInFailure(error.message)
        )
    }

}

export function* isUserAuthenticated() {
    try {
        const user = yield getCurrentUser();
        if (!user) return
        yield call(getSnapshotFromUser, user)
    } catch (error) {
        yield put(
            SignInFailure(error.message)
        )
    }

}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure(error))
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }))
    } catch (error) {
        yield put(signUpFailure(error))
    }

}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUser(user, additionalData)

}

export function* onGoogleSigInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);

}

export function* onEmailSigInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSaga() {
    yield all([
        call(onGoogleSigInStart),
        call(onEmailSigInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}










