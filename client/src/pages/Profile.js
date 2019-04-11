import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import API from "../utils/API";
import { Typography, Button } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PlaceTile from "../components/PlaceTile";
import { withRouter, Link } from "react-router-dom";
import Axios from "axios";

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
    color: theme.palette.text.secondary,
    background: "#eeeeee"
  }
});

class Profile extends Component {
  state = {
    trips: []
  };

  componentDidMount() {
    API.getTrips(this.props.user).then(res => {
      this.setState({ trips: res.data });
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={24}
          className={classes.userProfile}
          style={style.userProfile}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            item
            xs={12}
            sm={3}
          >
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <Typography variant="h6">{this.props.user.email}</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            direction="row"
            xs={12}
            sm={9}
            spacing={16}
          >
            {
              (this.state.trips.length === 0) ?
                (<Link to="/map" ><Button color="secondary">Create your first Trip</Button></Link>)
                :
                this.state.trips.map((trip, index) => {
                  return (
                    <Grid item xs={12} key={index}>
                      <Paper className={classes.paper}>
                        <Grid container spacing={16}>
                          <Grid container item xs={12} justify="space-between">
                            <Link to={"/map?id=" + trip._id}>
                              <Typography variant="h4">{trip.name}</Typography>
                            </Link>
                            <Button color="secondary" onClick={() => {
                              Axios.put("/api/places/deletetrip", { uid: trip._id }).then(val => {
                                let trips = this.state.trips;
                                trips.splice(index, 1);

                                this.setState({ trips });

                              })
                            }}>
                              Delete Trip
                        </Button>
                          </Grid>

                          <Grid item container justify="center" spacing={16}>
                            {trip.nodes.map((place, index) => {
                              return (
                                <Grid item xs={3} key={index}>
                                  <PlaceTile
                                    title={place.place}
                                    lat={place.lat}
                                    lng={place.lng}
                                  />
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  );
                })
            }

          </Grid>
        </Grid>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Profile));
