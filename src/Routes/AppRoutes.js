import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Register from "../Components/Auth/Register";
import Login from "../Components/Auth/Login";
import Header from "../Components/UI/Header";
import Category from "../Components/User/Category";
import PrivateRoute from "./PrivateRoutes";
import { connect } from "react-redux";
const AppRoutes =(props)=> {
    return (
      <div>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/">
            {props.isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/register" component={Register} />
            <PrivateRoute>
            <Route exact path="/dashboard" component={Category} />   
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    );
  }
  const mapStateToProps = (state) => {
    return {
      isLoggedIn:state.user.isLoggedIn   
    };
  };
  export default connect(mapStateToProps,null) (AppRoutes);