import { createSelector } from "reselect";

const selectModal = (state) => state.modal;

export const selectIsOpen = createSelector(
  [selectModal],
  (modal) => modal.isOpen
);
