import UserActionTypes from "./user.types.js";

//state is going to be passed by the redux store.
//when action first fires there is no state. so we need to set an initial state.
//null is considered to be value
//every single reducer gets every single action that ever gets fired. even if those actions are not related to this reducer.

const INITIAL_STATE = { currentUser: null, error: null };
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null, error: null };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
//note that we do not have start action here
