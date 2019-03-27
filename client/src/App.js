import React, { Component } from "react";
import auth from "./firebase/firebase";
import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { isNullOrUndefined } from "util";

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    auth.onAuthStateChanged(firebaseUser => {
      this.setState({
        user: firebaseUser
      });

      if (firebaseUser) {
        console.log(firebaseUser);
      } else {
        console.log("Login Did Not Compute");
      }
    });
  }

  render() {
    return (
      <Router>
        <div>
          {/* <Header /> */}
          <Navbar />
          <div className="App">
            {this.state.user && <h1>{this.state.user.email}</h1>}
            <Login />
          </div>
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
