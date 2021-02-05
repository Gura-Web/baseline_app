import * as ActionType from './actions';

export const modal = {
  open: () => ({
    type: ActionType.MODAL_OPEN as typeof ActionType.MODAL_OPEN,
  }),
  close: () => ({
    type: ActionType.MODAL_CLOSE as typeof ActionType.MODAL_CLOSE,
  }),
};

export type ModalAction =
  | ReturnType<typeof modal.open>
  | ReturnType<typeof modal.close>;
