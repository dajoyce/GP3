import React, { Wrapper } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withRouter, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import auth from "../firebase/firebase";
import API from "../utils/API";

// import Avatar from "@material-ui/core/Avatar";
const style = {
  appbarStyle: {
    background: "#6c763e",
    position: "unset"
  },
  buttonStyle: {
    background: "#ffffff",
    color: "#6c763e",
    height: 30,
    marginTop: 18
  }
};

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  textField: {},
  input: {
    color: "#6c763e",
    background: "white",
    height: "40px",
    marginRight: "10%",
    paddingBottom: "5px"
  }
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    email: "",
    password: ""
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  logout = () => {
    auth.signOut().then(res => {
      this.props.history.push("/");
    });
  };

  login = () => {
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        API.getUser(res.user.uid).then(user => {
          if (user.data === null) {
            API.createUser({
              name: "ERROR",
              email: res.user.email,
              uid: res.user.uid
            });
          }
        });
        this.props.history.push("/map");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const navbarContent = () => {
      const path = this.props.location.pathname;

      if (!this.props.user) {
        if (path === "/signup") {
          return <></>;
        } else {
          return (
            <>
              <TextField
                id="outlined-email-input"
                label="Email"
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange("email")}
                InputProps={{
                  className: classes.input
                }}
              />

              <TextField
                id="outlined-password-input"
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange("password")}
                InputProps={{
                  className: classes.input
                }}
              />
              <Button
                className={classes.button}
                style={style.buttonStyle}
                onClick={this.login}
                variant="contained"
                color="primary"
                className={this.props.classes.button}
              >
                Log In
              </Button>
            </>
          );
        }
      } else {
        return (
          <>
            <IconButton
              aria-owns={isMenuOpen ? "material-appbar" : undefined}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </>
        );
      }
    };

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem
          href="/profile"
          onClick={() => {
            this.handleMenuClose();
            this.props.history.push("/profile");
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          href="/map"
          onClick={() => {
            this.handleMenuClose();
            this.props.history.push("/map");
          }}
        >
          Map
        </MenuItem>
        <MenuItem href="/" onClick={this.logout}>
          Logout
        </MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar style={{ display: "block" }} className={classes.appBar} style={style.appbarStyle}>
          <Toolbar>
            {this.props.location.pathname === "/"
              ? ""
              : [
                  <IconButton color="inherit">
                    <img src="/images/appbarbranding.jpg" height={40} />
                  </IconButton>,
                  <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                    ivy
                  </Typography>
                ]}
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>{navbarContent()}</div>
            {renderMenu}
            {renderMobileMenu}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(PrimarySearchAppBar));
