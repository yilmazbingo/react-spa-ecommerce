import { modalActionTypes } from "./modal.types";

const INITIAL_STATE = {
  isOpen: false,
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case modalActionTypes.OPEN_MODAL:
      return { ...state, isOpen: true };
    case modalActionTypes.CLOSE_MODAL:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export default modalReducer;
