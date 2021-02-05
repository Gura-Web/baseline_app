import { Reducer } from 'redux';
import { ModalAction } from '../actions/modal/modal';
import * as ActionType from '../actions/modal/actions';

export interface ModalState {
  isModal: boolean;
}

export const initialState: ModalState = {
  isModal: false,
};

export const modalReducer: Reducer<ModalState, ModalAction> = (
  state: ModalState = initialState,
  action: ModalAction,
) => {
  console.log(action.type);

  switch (action.type) {
    case ActionType.MODAL_OPEN:
      return {
        ...state,
        isModal: true,
      };
    case ActionType.MODAL_CLOSE:
      return {
        ...state,
        isModal: false,
      };
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-case-declarations
      const _: never = action;

      return state;
  }
};
