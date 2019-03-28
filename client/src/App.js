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
<<<<<<< Updated upstream
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Profile" component={Profile} />
            <Route exact path="/Signup" component={Signup} />
=======
          <div className="App">
            {this.state.user && <h1>{this.state.user.email}</h1>}
            {/* <Login /> */}
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/signup" component={Signup} />
            {/* <Route component={NoMatch} /> */}
>>>>>>> Stashed changes
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
