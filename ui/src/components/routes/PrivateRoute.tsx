import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function PrivateRoute({ children, ...rest }: any) {
  let { user, loadUser } = useAuth();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
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
}

export default PrivateRoute;
