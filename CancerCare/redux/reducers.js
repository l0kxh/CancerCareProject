import {
  CHECK_LOGIN,
  LOGIN,
  LOGOUT,
  SIGNUP,
  GET_DATA,
  DARK_MODE,
  ADD_PREDICTION,
} from "./actions";

const initialState = {
  isLogin: false,
  Auth: null,
  user: null,
  darkMode: true,
  predictions : [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        Auth: action.payload,
      };
    case LOGOUT:
      return { ...state, isLogin: false, Auth: null, user: null };
    case CHECK_LOGIN:
      return {
        ...state,
        isLogin: true,
        Auth: action.payload,
        user: action.user,
        predictions : action?.prediction
      };
    case SIGNUP:
      return {
        ...state,
        isLogin: true,
        Auth: action.payload,
        user: action.payload,
      };
    case GET_DATA:
      return {
        ...state,
        user: action.payload,
        predictions : action.payload?.prediction
      };
    case DARK_MODE:
      return { ...state, darkMode: !state.darkMode };
    case ADD_PREDICTION:
      return {...state, predictions: action.payload}
    default:
      return state;
  }
}
export default userReducer;
