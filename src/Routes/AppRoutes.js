import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../Components/Auth/Register";
import Login from "../Components/Auth/Login";
import Header from "../Components/UI/Header";
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
            
          </Switch>
        </Router>
      </div>
    );
  }
  
  export default AppRoutes