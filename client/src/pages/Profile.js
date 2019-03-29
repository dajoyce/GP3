import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const style = {
  userProfile: {
    background: "red"
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

function Profile(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24} className={classes.userProfile} style={style.userProfile}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Profile Pic and Name</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Trips</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
