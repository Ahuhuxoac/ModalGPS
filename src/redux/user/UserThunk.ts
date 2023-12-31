import {AppThunk} from '@src/redux/common';
import {actions} from './UserActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postLogin =
  (payload?: any): AppThunk =>
  async (dispatch, _appState) => {
    try {
      let token = null;
      if (payload.username === 'ahuhuxoac' && payload.password === '123456') {
        token = payload.username + payload.password;
        // here we can use login api to get token and then store it
        await AsyncStorage.setItem('token', token);
        dispatch(
          actions.saveUser({
            user: {
              type: 'LOGIN',
              payload: payload,
            },
          }),
        );
        return 'LOGIN';
      } else {
        dispatch(
          actions.saveUser({
            user: {
              type: 'WRONGPASS',
            },
          }),
        );
        return 'WRONGPASS';
      }
    } catch (e) {
      console.log('postLogin Thunk Err>>>>', e);
      throw e;
    }
  };

export const Logout = (): AppThunk => async (dispatch, _appState) => {
  try {
    await AsyncStorage.clear();
    dispatch(
      actions.saveUser({
        user: {
          type: 'LOGOUT',
        },
      }),
    );
  } catch (e) {
    throw e;
  }
};
