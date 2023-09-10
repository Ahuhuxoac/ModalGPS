import {persistReducer} from 'redux-persist';
import {createReducer, getType} from 'typesafe-actions';

import {actions} from './UserActions';
import {storage} from '../_reduxPersist/persistConfig';

const stateKey = 'user';

export interface AppState {
  user: any;
  followUser: boolean;
}

/* ------------- Initial State ------------- */
const INITIAL_STATE: AppState = {
  user: false,
  followUser: false,
};

/* ------------- Reducers ------------- */

const saveUser = (
  state: AppState,
  {payload: {user}}: ReturnType<typeof actions.saveUser>,
) => ({
  ...state,
  user: user,
});

const saveFolowUser = (
  state: AppState,
  {payload: {followUser}}: ReturnType<typeof actions.saveFolowUser>,
) => ({
  ...state,
  followUser: followUser,
});

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [getType(actions.saveUser)]: saveUser,
  [getType(actions.saveFolowUser)]: saveFolowUser,
});

const persistConfig = {
  key: stateKey,
  storage,
};

const reducerMap = {
  [stateKey]: persistReducer(persistConfig, reducer),
};

/* ------------- Selectors ------------- */
const getReducerState = (state: any): AppState => state[stateKey];
const selectors = {
  getUserData: ({user}: AppState) => user,
  getFollowUser: ({followUser}: AppState) => followUser,
};

/* ------------- Export ------------- */
export default {
  selectors,
  // default export
  INITIAL_STATE,
  stateKey,
  getReducerState,
  reducerMap,
};
