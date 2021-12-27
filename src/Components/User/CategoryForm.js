import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Autocomplete, Box, Button, ButtonGroup, CircularProgress, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withFormik } from "formik";
import { addCategory } from "../../store/action/categoryActions";
import { toggleCategoryDialog } from "../../store/action/uiActions";
const useStyles = makeStyles({
    root: {
      flexGrow: 1,

    },
    paper: {
      textAlign: "center",
    },
    button: {
      margin: "5px",

    },
  });
  const CategoryForm = (props) => {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      dirty,
      isValid,
      isSubmitting,
      setValues,
    } = props;
    console.log("id",values)
    const createCategoryList = (categories,options=[])=>{
        for (let category of categories){
          options.push({
            value:category._id,name:category.name
          });
          if(category.children.length > 0){
            createCategoryList(category.children,options);
          }
        }
        return options;
     }
    const classes = useStyles();

  
    return (
      <div className={classes.root}>

          <div
            className=""
            style={{
              boxShadow: "3px 3px 10px black",
              padding: "50px",
              margin: "40px auto",
              width: "600px",
              boxSizing: "border-box",
            }}
          >

            <form onSubmit={handleSubmit}>
              <div className="flex-col sm:flex-row m-5 ">
              <div className="flex mt-4 p-4">
            <Autocomplete
              autoComplete={false}
              id="category"
              options={createCategoryList(props.categories)}
              className="flex-1"
              getOptionLabel={(option) => {
                if (option?.name) {
                  return `${option.name}`;
                } else {
                  return option || "";
                }
              }}
              isOptionEqualToValue={(option, value) =>{
                  console.log("optionss",value)
                return option.name === value
              } 
            }
              value={values.parent_category.name?values.parent_category.name:""}
              onChange={(_, value) => {
                if (value === null || value?.name.trim().length === 0) {
                
                } else {
                  setValues(
                      {
                        ...values,
                         parent_category:{
                             name: value?.name,
                             value: value?.value,
                         }
                      }
                      )
                }
              }}
              renderInput={(params) => {
                params.inputProps.className = "p-8";
                return (
                  <TextField
                    label="Category"
                    variant="outlined"
                    {...params}
                 
                    fullWidth
                  />
                );
              }}
            />
            </div>
            <div className="flex mt-4 p-4">
             <TextField
                  id="category_name"
                  label="Category Name"
                  className="p-12 my-12"
                  variant="outlined"
                  value={values.category_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  fullWidth
                />
          </div>
              </div>
  
              <div className="flex-col sm:flex-row m-5">
                
              </div>
              <div className="flex-col sm:flex-row ">
                {isSubmitting && (
                  <div className="flex flex-row w-full justify-center ">
                    <CircularProgress color="secondary" />
                  </div>
                )}
              </div>
              
              <div className="flex m-2 justify-center">
                <ButtonGroup className={`m-1`}>
                  <Button
                    color="primary"
                    className={`${classes.button}`}
                    variant="contained"
                    type="submit"
                    disabled={!dirty || isSubmitting || !isValid}
                  >
                    Add
                  </Button>
                  <Button
                    color="secondary"
                    className={`${classes.button}`}
                    variant="contained"
                    type="reset"
                    onClick={() => { props.toggleCategoryDialog()}}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </div>
            </form>
          </div>
      </div>
    );
  };
  const EnhancedCategoryForm = withFormik({
    mapPropsToValues: (props) => ({
      category_name: "",
      parent_category:""
    }),
    validationSchema: Yup.object().shape({
        category_name: Yup.string()
        .required("Category Name is required")
     
    }),
    handleSubmit: async (values, { setSubmitting, props }) => {
      try {
        setSubmitting(true);
         props.addCategory(values)

        setSubmitting(false);
        props.toggleCategoryDialog();
      } catch (error) {

      }
    },
    displayName: "Category"
  })(CategoryForm);
  const mapStateToProps = (state) => {
    const {categories} = state.category
    return {
        categories
     
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
       addCategory,
       toggleCategoryDialog
      },
      dispatch
    );
  };
  export default connect(mapStateToProps, mapDispatchToProps)(EnhancedCategoryForm);
  