import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Report from "views/examples/Report.js";
import firebase, { auth } from './firebase';

export default () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.getRedirectResult().then(result => {
      console.log("hahah", result);
      if (result.user !== null) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var suser = result.user;

        const data = {
          displayName: suser.displayName,
          email: suser.email,
          phoneNumber: suser.phoneNumber,
          photoURL: suser.photoURL,
          uid: suser.uid,
          token: token
        }

        window.localStorage.setItem('@user', JSON.stringify(data));
        setUser(data);
      } else {
        const userdata = JSON.parse(window.localStorage.getItem('@user'));
        // console.log('userData ', userdata);
        if (userdata !== null) {
          setUser(userdata);
        }
      }
      setLoading(false)
    }
    ).catch(err => {
      console.log("redirect login err ", err);
    })

  }, [])

  const handleAuthResult = (result) => {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var suser = result.user;

    const data = {
      displayName: suser.displayName,
      email: suser.email,
      phoneNumber: suser.phoneNumber,
      photoURL: suser.photoURL,
      uid: suser.uid,
      token: token
    }

    setUser(data);

    console.log("user ", user, token);
  }

  return (

    <BrowserRouter>
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
    </BrowserRouter>
  );
}