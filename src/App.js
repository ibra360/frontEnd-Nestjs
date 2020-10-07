import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./index.css";

// import Users from "./user/pages/Users";
// import UserAds from "./ads/pages/UserAds";
import Navbar from "./shared/components/Navigation/Navbar";
import AllProducts from "./Products/AllProducts";
import AddProducts from "./Products/AddProduct";
// import NewAd from "./ads/pages/NewAd";
// import UpdateAd from "./ads/pages/UpdateAd";
import Auth from "./User/Auth";
import Login from "./User/Login";
import { AuthContext } from "./shared/context/auth-context";
import { connect } from "react-redux";
import { saveUser } from "./Actions/UserActions";

let logoutTimer;

const App = (props) => {
  // let user = JSON.parse(localStorage.getItem("user"));
  // props.saveUser(user);

  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);
  let routes;
  if (token) {
    routes = (
      <Switch>
        {}
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <AllProducts />
        </Route>
        <Route path="/add" exact>
          <AddProducts />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        {/* <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/ads" exact>
          <UserAds />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" /> */}
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  USER: state.user,
});

export default connect(mapStateToProps, { saveUser })(App);
