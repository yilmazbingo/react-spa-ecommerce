import { modalActionTypes } from "./modal.types";

export const openModal = () => ({
  type: modalActionTypes.OPEN_MODAL,
});

export const closeModal = () => ({
  type: modalActionTypes.CLOSE_MODAL,
});
