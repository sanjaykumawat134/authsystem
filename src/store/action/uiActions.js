export const FAILED = "FAILED";
export const RESET = "RESET";
export const TOGGLE_CATEGORY_DIALOG ="TOGGLECATEGORYDIALOG";

export const failed = (msg) => {
  return async (dispatch) => {
    dispatch({
      type: FAILED,
      payload: msg,
    });
  };
};
export const toggleCategoryDialog = () => {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_CATEGORY_DIALOG,
    });
  };
};
export const reset = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET,
    });
  };
};
