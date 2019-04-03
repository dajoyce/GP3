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

const style = {
  buttonStyle: {
    background: "#6c763e"
  },
  textFieldStyle: {
    fullWidth: true
  }
};

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
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flexGrow: 1,
    marginTop: "10%"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  input: {
    color: "#6c763e"
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
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={24}
          className={this.props.classes.root}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Typography variant="h6" gutterBottom>
              Sign Up
            </Typography>
            <form className={classes.container} noValidate autoComplete="off" alignItems="center">
              <TextField
                id="outlined-name"
                label="Name"
                className={classes.textField}
                style={style.textFieldStyle}
                value={this.state.name}
                onChange={this.handleChange}
                name="name"
                margin="normal"
                variant="outlined"
                InputProps={{
                  className: classes.input
                }}
              />

              <TextField
                id="outlined-email-input"
                label="Email"
                className={classes.textField}
                style={style.textFieldStyle}
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                InputProps={{
                  className: classes.input
                }}
              />

              <TextField
                id="outlined-password-input"
                label="Password"
                className={classes.textField}
                style={style.textFieldStyle}
                value={this.state.password}
                onChange={this.handleChange}
                name="password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                InputProps={{
                  className: classes.input
                }}
              />

              <Button
                className={classes.button}
                style={style.buttonStyle}
                onClick={this.createAccount}
                variant="contained"
                color="primary"
                href="/signup"
                fullWidth={true}
                className={this.props.classes.button}
              >
                Sign Up
              </Button>

              {this.state.errors && <p>{this.state.errors}</p>}
            </form>
          </Grid>

          <Grid item xs={4} alignItems="stretch">
            <Typography variant="h6" gutterBottom>
              What We Do With Your Info
            </Typography>
            <Typography variant="body1" gutterBottom>
              This is a section that will say what we are using the users info for and how we use it
              but for now it is this dummy text. Please enjoy.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
