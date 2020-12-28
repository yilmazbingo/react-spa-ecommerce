import { createSelector } from "reselect";

//input selector
const selectUser = state => state.user;

//u can pass input selectors as func paramaters instead of array
export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);
