import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MessengerCustomerChat from 'react-messenger-customer-chat';

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Report from "views/Report.js";
import FAQ from 'views/FAQ.js'
import AboutUs from 'views/AboutUs.js'
import Advice from 'views/Advice.js'
import HelpCenter from 'views/HelpCenter.js'
import Stories from 'views/Stories.js'
import StoriesDetail from 'views/StoriesDetail.js'
import DemoNavbar from "components/Navbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

export default ({ user, loading, handleLogOut, ...props }) => {
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
              handleLogOut={handleLogOut}
              {...props}
            />}
        />
        <Route
          path="/stories"
          exact
          component={props =>
            <Stories
              {...props}
            />}
        />
        <Route
          path="/advice"
          exact
          component={props =>
            <Advice
              {...props}
            />}
        />
        <Route
          path="/helpcenter"
          exact
          component={props =>
            <HelpCenter
              {...props}
            />}
        />
        <Route
          path="/aboutus"
          exact
          component={props =>
            <AboutUs
              {...props}
            />}
        />
        <Route
          path="/faq"
          exact
          component={props =>
            <FAQ
              {...props}
            />}
        />
        <Route
          path="/storiesdetail"
          exact
          component={props =>
            <StoriesDetail
              {...props}
            />}
        />

        {/* <Redirect to="/" /> */}
      </Switch>
      <SimpleFooter />

      <MessengerCustomerChat
        pageId="103204638566365"
        appId="269359434900783"
      />
    </BrowserRouter>
  );
}