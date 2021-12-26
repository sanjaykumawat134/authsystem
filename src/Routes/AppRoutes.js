import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../Components/Auth/Register";
import Login from "../Components/Auth/Login";
import Header from "../Components/UI/Header";
import Category from "../Components/User/Category";
const AppRoutes =()=> {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Header}></Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Category} />   
          </Switch>
        </Router>
      </div>
    );
  }
  
  export default AppRoutes