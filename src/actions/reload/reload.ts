import { AxiosError } from 'axios';
import * as Action from './actions';

interface SetReloadParams {
  reloadHandler: Array<() => void>;
}

export const reload = {
  setReload: (params: SetReloadParams) => ({
    type: Action.SET_RELOAD as typeof Action.SET_RELOAD,
    payload: { params },
  }),
  reloadStart: () => ({
    type: Action.RELOAD_START as typeof Action.RELOAD_START,
    payload: {},
  }),
  reloadSucceed: () => ({
    type: Action.RELOAD_SUCCESS as typeof Action.RELOAD_SUCCESS,
    payload: {},
  }),
  reloadFailed: (error: AxiosError) => ({
    type: Action.RELOAD_FAILED as typeof Action.RELOAD_FAILED,
    payload: { error },
  }),
};

export type ReloadAction =
  | ReturnType<typeof reload.setReload>
  | ReturnType<typeof reload.reloadStart>
  | ReturnType<typeof reload.reloadSucceed>
  | ReturnType<typeof reload.reloadFailed>;
