import React, { Component } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
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
