import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import API from "../utils/API"
import { Typography } from "@material-ui/core";

const style = {
  userProfile: {
    // background: "#6c763e"
  }
};

const tripStyle = {
  trip: {
    background: "#6c763e",
    marginBottom: "5%"
  }
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: "10%"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Profile extends Component {
  state = {
    trips: []
  }

  componentDidMount() {
    API.getTrips(this.props.user).then(res => {
      this.setState({ trips: res.data })
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} className={classes.userProfile} style={style.userProfile}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>Profile Pic and Name</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            {this.state.trips.map(trip => {
              return (
                <Paper className={classes.paper}>
                  <Typography variant="h6">{trip.name}</Typography>
                </Paper>
              );
            })}
          </Grid>
        </Grid>
      </div>
    )
  };
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
