import React, { Component } from "react";
import auth from "./firebase/firebase";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import MapPage from "./pages/MapPage";

class App extends Component {
  state = {
    user: auth.currentUser
  };

  componentDidMount() {
    document.body.style.margin = 0;
    auth.onAuthStateChanged(firebaseUser => {
      this.setState({
        user: firebaseUser
      });

      if (firebaseUser) {
        console.log(firebaseUser);
      } else {
        console.log("Logged out");
        this.props.history.push("/");
      }
    });
  }

  renderIfAuth(Component) {
    if (auth.currentUser) {
      return <Component user={this.state.user} />
    } else {
      return <Redirect to="/" />
    }
  }

  render() {
    return (
      <div>
        <Navbar user={this.state.user} />
        <Switch>
          <Route exact path="/" render={() => {
            return <Home user={this.state.user} />;
          }} />
          <Route exact path="/signup" render={() => {
            return <Signup user={this.state.user} />;
          }} />
          <Route exact path="/profile" render={() => this.renderIfAuth(Profile)} />
          <Route exact path="/map" render={() => this.renderIfAuth(MapPage)} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
