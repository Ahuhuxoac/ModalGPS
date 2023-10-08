import {AppThunk} from '@src/redux/common';
import {actions} from './MapActions';

export const changeDistance =
  (payload?: any): AppThunk =>
  async (dispatch, _appState) => {
    try {
      console.log(payload)
      await dispatch(
        actions.saveDistance({
          distance: payload,
        }),
      );
      return payload;
    } catch (e) {
      throw e;
    }
  };
