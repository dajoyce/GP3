import React, { Component } from "react";
import PropTypes from "prop-types";
import auth from "../firebase/firebase";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import API from "../utils/API";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = {
  header: {
    backgroundImage: "url('/images/highway-background.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: 450
  },
  brandImage: {
    height: 250,
    marginTop: 85
  }
}

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
          name: this.state.name,
          email: this.state.email,
          uid: res.user.uid
        }).then(serverResponse => {
          this.props.history.push("/profile");
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

    return (

      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={24}
      >
        <Grid item xs={12}>
          <div style={styles.header}>
            <img
              src="/images/circle-logo-ivy-trans.png"
              alt="Highway Background"
              style={styles.brandImage}
            />
          </div>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" gutterBottom>
            Sign Up
            </Typography>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-name"
              label="Name"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
              margin="normal"
              variant="outlined"
              fullWidth={true}
            />

            <TextField
              id="outlined-email-input"
              label="Email"
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              fullWidth={true}
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              fullWidth={true}
            />

            <Button
              onClick={this.createAccount}
              variant="contained"
              color="primary"
              href="/signup"
              fullWidth={true}
            >
              Sign Up
              </Button>

            {this.state.errors && <p>{this.state.errors}</p>}
          </form>
        </Grid>

        <Grid item xs={3} alignItems="stretch">
          <Typography variant="h6" gutterBottom>
            What We Do With Your Info
            </Typography>
          <Typography variant="body1" gutterBottom>
            All of your information is stored securely in our database and is NEVER shared with
            anyone. We take your privacy seriously! All information provided is used to make your
            experience with Ivy a pleasant one. So sit back and enjoy the ride.
            </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default Signup;
