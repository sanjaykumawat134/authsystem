export const FAILED = "FAILED";
export const RESET = "RESET";
const SUCCESS = "SUCCESS";

export const failed = (msg) => {
  return async (dispatch) => {
    dispatch({
      type: FAILED,
      payload: msg,
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
