import { combineReducers } from "redux";
import userReducer from "./userReducer";
import uiReducer from "./uiReducer";
import categoryReducer from "./categoryReducer";
const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  category:categoryReducer
});

export default rootReducer;
