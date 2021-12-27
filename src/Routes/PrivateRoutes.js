import { Redirect, Route } from "react-router";
export const PrivateRoute = ({ children, ...rest }) => {
  const isLoggedIn = localStorage.getItem("authToken");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
