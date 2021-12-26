import axios from "axios";

export const GET_ALL_CATEGORIES = "GETALLCATEGORIES";
export const ADD_CATEGORY = "ADDCATEGORY";
export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";


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
            const resp = await axios.post("http://localhost:3000/category/create",{
                name:  values.category_name,
                     parentId:  values.parent_category.value,
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