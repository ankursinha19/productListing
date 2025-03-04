import { all, call, spawn } from 'redux-saga/effects';
import {
  LoginSagaWatcher, handleAuthWatcher, handleRefreshTokenWatcher, handleAllPostApiWatcher,
} from './saga';

// Root saga
function* rootSaga() {
  const sagas = [LoginSagaWatcher, handleAuthWatcher, handleRefreshTokenWatcher, handleAllPostApiWatcher];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log('Error ', e);
          }
        }
      }),
    ),
  );
}

export default rootSaga;
