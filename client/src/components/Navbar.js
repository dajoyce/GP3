import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Login from "../components/Login";

// import Avatar from "@material-ui/core/Avatar";
const style = {
  appbarStyle: {
    background: "#6c763e"
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
  appBar: {
    zIndex: 2000
  }
  // bigAvatar: {
  //   margin: 10,
  //   width: 60,
  //   height: 60
  // }
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
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

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    console.log(this.props.location);

    const navbarContent = () => {
      const path = this.props.location.pathname;
      // debugger;
      if (path === "/") {
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
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
            />
            <Button
              onClick={this.Login}
              variant="contained"
              color="primary"
              href="/map"
              className={this.props.classes.button}
            >
              Log In
            </Button>
            <Button
              variant="contained"
              color="primary"
              href="/signup"
              className={this.props.classes.button}
            >
              Sign Up
            </Button>
          </>
        );
      } else if (path === "/map" || path === "/profile") {
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
      } else if (path === "/signup") {
        return <></>;
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
        <MenuItem href="/profile" onClick={this.handleMenuClose}>
          Profile
        </MenuItem>
        <MenuItem href="/" onClick={this.handleMenuClose}>
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
        <AppBar position="fixed" className={classes.appBar} style={style.appbarStyle}>
          <Toolbar>
            {/* <Avatar alt="Ivy Logo" src="#" className={classes.bigAvatar}>
              <AccountCircle />
            </Avatar> */}
            <IconButton
              // aria-owns={isMenuOpen ? "material-appbar" : undefined}
              // aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              ivy
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>{navbarContent()}</div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(PrimarySearchAppBar));
