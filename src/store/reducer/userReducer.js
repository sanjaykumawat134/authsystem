import * as Actions from "../action/userActions";

const intialState = {
  isLoggedIn: localStorage.getItem("authToken")?true: false,
  activeUser: null,
  authToken: null,
  authenticating: true,
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case Actions.LOGIN: {
      return {
        ...state,
        isLoggedIn: true,
        activeUser: action.payload,
        authenticating: false,
      };
    }
    case Actions.REGISTER: {
      return {
        ...state,
        isLoggedIn: true,
        activeUser: action.payload,
        authenticating: false,
      };
    }
    case Actions.LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        activeUser: null,
        authenticating: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;