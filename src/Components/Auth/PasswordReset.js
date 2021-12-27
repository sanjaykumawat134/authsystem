import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper } from "@mui/material";
import { withFormik } from "formik";
import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {resetPassword} from "../../store/action/userActions";
import * as Yup from "yup";

const PasswordReset = (props) => {
    const {
        values,
        touched,
        errors,
        handleBlur,
        handleSubmit,
        dirty,
        isValid,
        isSubmitting,
        setValues,
      } = props;
      const [showPassword, setshowPassword] = useState(false);
      const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
      };
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      return (
        <div>
          <Paper
            className="flex-col sm:flex-row justify-center m-5 p-5"
            elevation={6}
          >
              <form onSubmit={handleSubmit} style={{width:"600px",padding:"10px"}}>
                  <InputLabel htmlFor="password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  className="w-full"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  error={touched.password && !!errors.password}
                  onChange={(event) => {
                    setValues({ ...values, password: event.target.value });
                  }}
                  onBlur={handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <div className="text-red-600">{errors.password}</div>
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
      password: "",
    }),
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum.")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
          "password must be minimum eight characters, at least one letter, one number and one special character:"
        ),
    }),
    handleSubmit: async (values, { setSubmitting, props }) => {
      try {
        setSubmitting(true);
        console.log("propsgg",props.match.params.userId)
        const res = await props.resetPassword(props.match.params.userId,props.match.params.token,values.password);
        
        setSubmitting(false);
        if (res) {
          alert("password reseted successfully ...!");
          props.history.push("/login");
        } else{
            alert("user does not exist or token expires...!")
        }
      } catch (error) {
      }
    },
    displayName: "Login",
  })(PasswordReset);
  const mapStateToProps = (state) => {
    return {
     
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
          resetPassword
      },
      dispatch
    );
  };
  export default connect(mapStateToProps, mapDispatchToProps)(EnhancedPasswordResetForm);
  