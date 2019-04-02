import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import API from "../utils/API"
import { Typography } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PlaceTile from "../components/PlaceTile";
import { withRouter, Link } from 'react-router-dom'

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
          <Grid container justify="center" item xs={12} sm={3}>
            <Grid item xs={12}>
              <AccountCircle />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                {this.props.user.email}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={9}>
            {this.state.trips.map((trip, index) => {
              return (
                <Paper className={classes.paper} key={index}>
                  <Link to={"/map?id=" + trip._id}>
                    <Typography variant="h6">{trip.name}</Typography>
                  </Link>

                  <Grid container justify="center" spacing={24}>
                    {trip.nodes.map((place, index) => {
                      return (<Grid item xs={3} key={index}>
                        < PlaceTile title={place.place} lat={place.lat} lng={place.lng} />
                      </Grid>
                      )
                    })}
                  </Grid>

                </Paper>
              );
            })}
          </Grid>
        </Grid>
      </div >
    )
  };
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Profile));
