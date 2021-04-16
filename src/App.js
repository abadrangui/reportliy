import React, { useEffect, useState } from 'react';
import firebase, { auth } from './firebase';
import Navigator from './Navigator'

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

  const handleLogOut = () => {
    setUser(null);
    window.localStorage.removeItem('@user');
  }

  return (
    <Navigator
      user={user}
      loading={loading}
      handleLogOut={handleLogOut}
    />
  );
}