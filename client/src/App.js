import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <Header /> */}
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Profile" component={Profile} />
            <Route exact path="/Signup" compoenent={Signup} />
            {/* <Route component={NoMatch} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
