import React, { Component } from "react";
import auth from "./firebase/firebase";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import MapPage from './pages/MapPage';
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
          <Navbar />
          <div className="App">
            {this.state.user && <h1>{this.state.user.email}</h1>}
            <Login />
          </div>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/signup" compoenent={SignupPage} />
            <Route exact path="/map" component={MapPage} />
            {/* <Route component={NoMatch} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
