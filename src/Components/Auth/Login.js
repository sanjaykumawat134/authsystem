import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, ButtonGroup, CircularProgress, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withFormik } from "formik";
import {login} from "../../store/action/userActions";
import {
  Link
} from "react-router-dom";
const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      // width: "600px",
    },
    paper: {
      textAlign: "center",
    },
    button: {
      margin: "5px",

    },
  });
  const Login = (props) => {
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
    const customOnChange = (event) => {
      props.reset();
      handleChange(event);
    };
    const classes = useStyles();

  
    const [showPassword, setshowPassword] = useState(false);
    const handleClickShowPassword = () => {
      setshowPassword(!showPassword);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    return (
      <div className={classes.root}>
        <Paper
          className="flex-col sm:flex-row justify-center m-5 p-5"
          elevation={6}
        >
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
            {
              <Box
                fontWeightBold
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Icon style={{ fontSize: "6rem" }}>account_circle</Icon>
              </Box>
            }
            <form onSubmit={handleSubmit}>
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
  
              <div className="flex-col sm:flex-row m-5">
                
  
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
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
                <div className="text-red-600">

                  {errors.password}
                </div>
              </div>
              <div className="flex-col sm:flex-row ">
                {isSubmitting && (
                  <div className="flex flex-row w-full justify-center ">
                    <CircularProgress color="secondary" />
                  </div>
                )}
              </div>
              <div className="flex-col sm:flex-row ">
                <div
                  className="flex flex-row w-full justify-center "
                  style={{ color: "red" }}
                >
                  {props.msg}
                </div>
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
                    Login
                  </Button>
                  <Button
                    color="secondary"
                    className={`${classes.button}`}
                    variant="contained"
                    type="reset"
                    onClick={() => {}}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
                <div>
                <Link to="/forgot-password">Forgort password</Link>
                </div>
              </div>
            </form>
          </div>
        </Paper>
      </div>
    );
  };
  const EnhancedLoginForm = withFormik({
    mapPropsToValues: (props) => ({
      email: "",
      password: "",
    }),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Email is not valid"),
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
        const res = await props.login(values);
        setSubmitting(false);
        if (res === 200) {
          alert("successfully logged in ...!");
        //   props.history.push("/users");
        } else {
          props.history.push("/login");
        }
      } catch (error) {

      }
    },
    displayName: "Login",
  })(Login);
  const mapStateToProps = (state) => {
    return {
     
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
        login,
      },
      dispatch
    );
  };
  export default connect(mapStateToProps, mapDispatchToProps)(EnhancedLoginForm);
  