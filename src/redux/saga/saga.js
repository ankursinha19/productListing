import { call, put, takeLatest, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginCreatorType, sliceActions, authCreatorType, refreshTokenCreatortype, getAllPostCreatorType } from '../reducers/slices/authSlice';
import { LoginApi, fetchUserData, refreshApi, getAllPostApi } from './ApiCalls';



function* handleLogin(action) {
    const { username, password } = action.payload;
    try {
        yield put(sliceActions.loginRequest(true))
        const response = yield call(LoginApi, username, password);
        yield AsyncStorage.setItem('token', response?.accessToken);
        yield AsyncStorage.setItem('refreshToken', response.refreshToken);
        yield put(sliceActions.loginSuccess(response?.accessToken));
        yield put(sliceActions.loggedInUser(response))

    } catch (error) {
        yield put(sliceActions.loginFailure(error.message));
    }
}


export function* LoginSagaWatcher() {
    yield takeLatest(loginCreatorType, handleLogin);
}

function* handleAuth() {
    try {
        yield put(sliceActions.authLoading(true))
        const response = yield call(fetchUserData);
        yield put(sliceActions.authUser(response))
    } catch (error) {
        yield put(sliceActions.authFailure(error.message));
    }
}

// Watcher saga: Watches for  Auth actions
export function* handleAuthWatcher() {
    yield takeLatest(authCreatorType, handleAuth);
}


// refreshtoken Api
function* handleRefreshToken() {
    console.log("dfsjksjdfsjdfsdjfhsdjfk")
    try {
        const refreshToken = yield select((state) => state.auth.refreshToken);
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }
        yield put(sliceActions.refreshTokenRequest())
        const data = yield call(refreshApi, refreshToken);
        yield AsyncStorage.setItem('token', data.accessToken);
        yield AsyncStorage.setItem('refreshToken', data.refreshToken);
        yield put(sliceActions.refreshTokenSuccess(data));
        yield put(sliceActions.loginSuccess(data.accessToken));
    } catch (error) {
        yield put(sliceActions.refreshTokenFailure(error.message));
    }
}
// Watcher saga: Watches for  refresh actions
export function* handleRefreshTokenWatcher() {
    yield takeLatest(refreshTokenCreatortype, handleRefreshToken);
}




function* handleAllPostApi() {
    try {
        yield put(sliceActions.setAllPostLoading())
        const response = yield call(getAllPostApi);
        yield put(sliceActions.setAllPost(response?.posts))
    } catch (error) {
        yield put(sliceActions.setAllPostFailure(error.message));
    }
}

// Watcher saga: Watches for  all post actions
export function* handleAllPostApiWatcher() {
    yield takeLatest(getAllPostCreatorType, handleAllPostApi);
}
