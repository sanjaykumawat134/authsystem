import * as Actions from "../action/uiActions";

const intialState = {
  isOpen: false,
  categoryDialog:false,
  msg: "",
};

const uiReducer = (state = intialState, action) => {
  switch (action.type) {
    case Actions.TOGGLE_CATEGORY_DIALOG:{
         return {
         ...state,
         categoryDialog:!state.categoryDialog  
        };
    }
    case Actions.FAILED: {
      return {
        ...state,
        isOpen: true,
        msg: action.payload,
      };
    }
    case Actions.RESET: {
      return {
        ...state,
        isOpen: false,
        msg: "",
      };
    }
    default: {
      return state;
    }
  }
};

export default uiReducer;