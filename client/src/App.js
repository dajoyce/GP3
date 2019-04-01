import React, { Component } from "react";
import auth from "./firebase/firebase";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import MapPage from "./pages/MapPage";
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
        console.log("Logged out");
      }
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div className="App">{this.state.user && <h1>{this.state.user.email}</h1>}</div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/map" component={MapPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
