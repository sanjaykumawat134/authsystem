import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material";
import { withFormik } from "formik";
import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {resetPassword ,passwordResetRequest} from "../../store/action/userActions";
import * as Yup from "yup";
const PasswordChange = (props) => {
    const {
        values,
        touched,
        errors,
        handleBlur,
        handleSubmit,
        handleChange,
        dirty,
        isValid,
        isSubmitting,
      } = props;
    
      return (
        <div>
          <Paper
            className="flex-col sm:flex-row justify-center m-5 p-5"
            elevation={6}
          >
              <form onSubmit={handleSubmit} style={{width:"600px",padding:"10px"}}>
              <div className="flex-col sm:flex-row m-5 ">
                <TextField
                  id="outlined-basic"
                  label="email"
                  variant="outlined"
                  fullWidth
                  required
                  name="email"
                  error={touched.email && !!errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  helperText={touched.email && !!errors.email && errors.email}
                />
              </div>
               
                <div className="pt-5">
                  
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!dirty || isSubmitting || !isValid}
                  >
                    Confirm
                  </Button>
                </div>
                  </form>
                </Paper>
                </div>
         )
                              
}
const EnhancedPasswordResetForm= withFormik({
    mapPropsToValues: (props) => ({
      email: "",
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
        .required("Email is required")
        .email("Email is not valid"),
    }),
    handleSubmit: async (values, { setSubmitting, props }) => {
      try {
        setSubmitting(true);
        const res = await props.passwordResetRequest(values.email);  
        setSubmitting(false);
        if (res) {
          alert("check your email ...!");
          props.history.push("/");
        } else{
            alert("user does not exist ...!")
        }
      } catch (error) {
      }
    },
    displayName: "ChangePassword",
  })(PasswordChange);
  const mapStateToProps = (state) => {
    return {
     
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
          resetPassword,
          passwordResetRequest
      },
      dispatch
    );
  };
  export default connect(mapStateToProps, mapDispatchToProps)(EnhancedPasswordResetForm);
  