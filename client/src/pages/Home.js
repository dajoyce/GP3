import React, { Component } from "react";
//import { makeStyles } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2
  }
});

class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <Grid className={this.props.classes.root} container justify="center">
        <Grid item xs={12} sm={6}>
          <Paper className={this.props.classes.paper} elevation={1}>
            <Grid container justify="center">
              <Grid item xs={12} sm={6}>
                <img src="/images/ivy-brading-large.jpg" width={"100%"} />
              </Grid>
              <Typography variant="subtitle1" gutterBottom>
                we believe that a trip should be more than just a destination.
                <br />
                we believe that the idea of leaving one place simply to go enjoy
                another is, well, boring.
                <br />
                we believe that a true trip shouldn't have just one destination.
                <br />
                we created ivy to disrupt your typical trip planning and
                experience more when you hit the road.
                <br />
                ivy lets you figure out where to go with more ease and
                spontaneity.
                <br />
                with ivy we make sure you find new spots and never go the same
                way twice.
                <br />
                we believe in detours, not destinations. we know ivy will make
                you a believer too.
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
