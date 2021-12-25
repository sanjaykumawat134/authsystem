import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, ButtonGroup, CircularProgress, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { withFormik } from "formik";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {register} from "../../store/action/userActions";
const useStyles = makeStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },
    paper: {
      textAlign: "center",
    },
    button: {
      margin: "5px",
    },
  });
const Register = (props) => {
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
    const [showPassword, setshowPassword] = useState(false);
    console.log("props=>", props);
        const classes = useStyles();
    const customOnChange = (event) => {
      props.reset();
      handleChange(event);
    };
  
    const handleClickShowPassword = () => {
      setshowPassword(!showPassword);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    return (
      <Paper className={classes.root}>
        <div
          className="flex-col sm:flex-row justify-center m-5 p-5"
        >
          <div
            style={{
              boxShadow: "3px 3px 10px black",
              padding: "50px",
              margin: "40px auto",
              // width: "600px",
              boxSizing: "border-box",
            }}
          >
            {
              <Box
                fontWeightBold
                style={{ display: "flex", justifyContent: "center" }}
              >
               <AppRegistrationIcon  />
              </Box>
            }
            <form
              onSubmit={handleSubmit}
              // style={{ width: "600px", margin: "auto" }}
            >
              <div className="flex-col sm:flex-row m-5 ">
                <TextField
                className="mt-3"
                  type="text"
                  id="firstName"
                  label="firstName"
                  variant="outlined"
                  fullWidth
                  required
                  name="firstName"
                  error={touched.firstName && !!errors.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  helperText={touched.firstName && !!errors.firstName && errors.firstName}
                />
                <TextField
                  type="text"
                  id="lastName"
                  style={{marginTop:"12px"}}
                  label="lastName"
                  variant="outlined"
                  fullWidth
                  required
                  name="lastName"
                  error={touched.lastName && !!errors.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  helperText={touched.lastName && !!errors.lastName && errors.lastName}
                />
              </div>
              <div className="flex-col sm:flex-row m-5 ">
                <TextField
                  id="outlined-basic"
                  label="email"
                  variant="outlined"
                  fullWidth
                  required
                  name="email"
                  error={touched.email && !!errors.email}
                  // onChange={customOnChange}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  helperText={touched.email && !!errors.email && errors.email}
                />
                <TextField
                  id="outlined-basic"
                  style={{marginTop:"12px"}}
                  label="phone"
                  variant="outlined"
                  fullWidth
                  required
                  name="phone"
                  error={touched.phone && !!errors.phone}
                  // onChange={customOnChange}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  helperText={touched.phone && !!errors.phone && errors.phone}
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
              <div className="flex-col sm:flex-row m-5">
                {isSubmitting && (
                  <div className=" flex flex-row w-full justify-center items-center">
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
              <div className="flex justify-center m-2 ">
                <ButtonGroup className={`m-1`}>
                  <Button
                    color="primary"
                    className={`${classes.button}`}
                    variant="contained"
                    type="submit"
                    disabled={!dirty || isSubmitting || !isValid}
                  >
                    register
                  </Button>
                  <Button
                    color="secondary"
                    className={`${classes.button}`}
                    variant="contained"
                    type="reset"
                    onClick={() => {}}
                  >
                    reset
                  </Button>
                </ButtonGroup>
              </div>
            </form>
          </div>
        </div>
      </Paper>
    );
  };
  const EnhancedRegisterForm = withFormik({
    mapPropsToValues: (props) => ({
      firstName: "",
      lastName: "",
      phone:"",
      email: "",
      password: "",
    }),
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("firstName is required"),
      lastName: Yup.string().required("lastName is required"),
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
        phone: Yup.string()
        .required("This field is required")
        .matches(/^[0-9]{10}$/i, "Invalid phone number"),
    }),
    handleSubmit: async (values, { setSubmitting, props }) => {
      try {
        setSubmitting(true);
        const res = await props.register(values);
        setSubmitting(false);
        if (res === 201) {

          alert("successfully registered...!")
        } 
        props.history.push("/login");
      } catch (error) {
        console.log("error", error);
      }
    },
    displayName: "Login",
  })(Register);
  const mapStateToProps = (state) => {
    return {
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
        register
      },
      dispatch
    );
  };
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EnhancedRegisterForm);
  
