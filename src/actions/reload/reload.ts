import * as Action from './actions';

interface SetReloadParams {
  reloadHandler: () => void;
}

export const reload = {
  setReload: () => ({
    type: Action.SET_RELOAD as typeof Action.SET_RELOAD,
    payload: {},
  }),
  reloadStart: () => ({
    type: Action.RELOAD_START as typeof Action.RELOAD_START,
    payload: {},
  }),
  reloadSucceed: () => ({
    type: Action.RELOAD_SUCCESS as typeof Action.RELOAD_SUCCESS,
    payload: {},
  }),
  reloadFailed: () => ({
    type: Action.RELOAD_FAILED as typeof Action.RELOAD_FAILED,
    payload: {},
  }),
};
