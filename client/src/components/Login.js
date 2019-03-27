import React from "react";
import auth from "../firebase/firebase";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: null
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  createAccount = () => {
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this.setState({
          errors: null
        });
      })
      .catch(error => {
        this.setState({
          errors: error.message
        });
      });
  };

  signIn = () => {
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this.setState({
          errors: null
        });
      })
      .catch(function(error) {
        this.setState({
          errors: error.message
        });
      });
  };

  signOut = () => {
    auth.signOut();
  };

  render() {
    return (
      <div>
        <input placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />

        <input
          placeholder="Password"
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />

        <button onClick={this.createAccount}>Create Account</button>
        <button onClick={this.signIn}>Sign In</button>
        <button onClick={this.signOut}>Sign Out</button>
        {this.state.errors && <p>{this.state.errors}</p>}
      </div>
    );
  }
}

export default Login;
