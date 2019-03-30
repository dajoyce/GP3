import React, { Component } from "react";
import PropTypes from "prop-types";
import auth from "../firebase/firebase";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import API from "../utils/API";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "5%"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errors: null
  };

  handleChange = i => {
    const name = i.target.name;
    const value = i.target.value;
    this.setState({ [name]: value });
  };

  createAccount = e => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        API.createUser({
          username: this.state.name,
          email: this.state.email,
          uid: res.user.uid
        }).then(serverResponse => {
          console.log(serverResponse);
        });
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

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-email-input"
          label="Email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          value={this.state.password}
          onChange={this.handleChange}
          name="password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />

        <Button
          onClick={this.createAccount}
          variant="contained"
          color="primary"
          href="/signup"
          className={this.props.classes.button}
        >
          Sign Up
        </Button>

        {this.state.errors && <p>{this.state.errors}</p>}
      </form>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
