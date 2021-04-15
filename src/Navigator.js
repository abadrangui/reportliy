import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Report from "views/examples/Report.js";
import DemoNavbar from "components/Navbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

export default ({ user, loading, ...props }) => {
  return (
    <BrowserRouter>
      <DemoNavbar />
      <Switch>
        <Route path="/test" exact render={props => <Index {...props} />} />
        <Route
          path="/landing-page"
          exact
          render={props => <Landing {...props} />}
        />
        <Route path="/login-page" exact render={props => <Login {...props} />} />
        <Route
          path="/profile-page"
          exact
          render={props => <Profile {...props} />}
        />
        <Route
          path="/register-page"
          exact
          render={props => <Register {...props} />}
        />

        <Route
          path="/"
          exact
          component={props =>
            <Report
              user={user}
              loading={loading}
              {...props}
            />}
        />

        {/* <Redirect to="/" /> */}
      </Switch>
      <SimpleFooter />
    </BrowserRouter>
  );
}