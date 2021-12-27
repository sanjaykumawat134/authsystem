import axios from "axios";
import { getAuthToken } from "./userActions";

export const GET_ALL_CATEGORIES = "GETALLCATEGORIES";
export const ADD_CATEGORY = "ADDCATEGORY";
export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATECATEGORY";


export const getAllCategories = () => {
    return async dispatch => {
        try {
            const resp = await axios.get("http://localhost:3000/category/");
            if (resp.status === 200) {
                dispatch({
                    type: GET_ALL_CATEGORIES,
                    payload: resp.data.categories
                })
            }
        } catch (error) {

        }
    }
}
export const addCategory = (values) => {
    return async dispatch => {
        try {
            const token = getAuthToken();
            const resp = await axios.post("http://localhost:3000/category/create",{
                name:  values.category_name,
                     parentId:  values.parent_category.value,
            },{
                headers:{
                    Authorization: token,
                }
            });
            if (resp.status === 201) {
                dispatch({
                    type: ADD_CATEGORY,
                    payload: resp.data.category
                })
            }
        } catch (error) {

        }
    }
}
export const updateCateogry = (values) => {
    return async dispatch => {
        try {
            const token = getAuthToken();
            const resp = await axios.post("http://localhost:3000/category/update",values,  {
                headers: {
                //   "Content-Type": `multipart/form-data; boundary=${values._boundary}`,
                  Authorization: token,
                },
              });
            if (resp.status === 200) {
              return true
            }
        } catch (error) {

        }
    }
}
export const deleteCateogry = (values) => {
    return async dispatch => {
        try {
            const token = getAuthToken();
            const resp = await axios.post("http://localhost:3000/category/delete",values,  {
                headers: {
                  Authorization: token,
                },
              });
            if (resp.status === 200) {
              return true
            }
        } catch (error) {

        }
    }
}