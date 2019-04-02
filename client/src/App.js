import React, { Component } from "react";
import auth from "./firebase/firebase";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import MapPage from "./pages/MapPage";
import { isNullOrUndefined } from "util";

class App extends Component {
  state = {
    user: auth.currentUser
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

  renderIfAuth(Component) {
    console.log(auth.currentUser)
    if (auth.currentUser) {
      return <Component user={this.state.user} />
    } else {
      return <Redirect to="/" />
    }

  }

  render() {
    return (
      <Router>
        <div>
          <Navbar user={this.state.user} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" render={() => this.renderIfAuth(Profile)} />
            <Route exact path="/map" render={() => this.renderIfAuth(MapPage)} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
