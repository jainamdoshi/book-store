import React, { Component } from "react";
import "./Stylesheets/App.css";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from "./components/Persons/Profile";
import Admin from "./components/Admin/admin";
import ReviewAccounts from "./components/Admin/ReviewAccounts";
import { Provider } from "react-redux";
import store from "./store";

import Home from "./components/Home";
import Landing from "./components/Layout/Landing";

import AddUser from "./components/Persons/AddUser";
import AddBook from "./components/Books/AddBook";
import transactionPage from "./components/Transactions/transactionPage";
import SellPage from "./components/Transactions/SellPage";
import SharePage from "./components/Transactions/SharePage";
import BuyPage from "./components/Transactions/BuyPage";
import AboutUs from "./components/AboutUs";

import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import Logout from "./components/UserManagement/Logout";
import PaypalPayment from "./components/Transactions/PaypalPayment";

// These codes are added by Homy below
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute";
import ShowOneBook from "./components/Books/ShowOneBook";
import EditBook from "./components/Books/EditBook";
import ContactUs from "./components/ContactUs";
import EditUser from "./components/Persons/EditUser";


const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  // setJWTToken needs to be coded for token
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {
              //Public Routes
            }

            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {
              //Private Routes
            }
            <Route exact path="/home" component={Home} />
            <SecuredRoute exact path="/profile" component={Profile} />
            <SecuredRoute exact path="/admin" component={Admin} />
            <SecuredRoute exact path="/reviewAccounts" component={ReviewAccounts} />
            <SecuredRoute exact path="/logout" component={Logout} />
            <SecuredRoute exact path="/addUser" component={AddUser} />
            <SecuredRoute exact path="/editbook/**" component={EditBook} />
            <SecuredRoute exact path="/sell" component={SellPage} />
            <SecuredRoute exact path="/share/**" component={SharePage} />
            <SecuredRoute exact path="/buy/**" component={BuyPage} />
            <SecuredRoute exact path="/paymentTransaction" component={PaypalPayment} />
            <SecuredRoute exact path="/edituser/**" component={EditUser} />
            <Route exact path="/addbook" component={AddBook} />
            <Route exact path="/book/**" component={ShowOneBook} />
            <Route exact path="/transactionhistory" component={transactionPage} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/contactus" component={ContactUs} />


          </div>
          <Footer />
        </Router>
      </Provider>
    );
  }
}
export default App;