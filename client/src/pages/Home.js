import React, { Component } from "react";
//import { makeStyles } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const style = {
  buttonStyle: {
    background: "#6c763e"
  },
  typographyStyle: {
    textAlign: "center"
  }
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters()
  },
  paper: {
    padding: theme.spacing.unit * 2
  }
});

// const { classes } = this.props;

class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <Grid className={this.props.classes.root} container justify="center" style={{ padding: 0 }}>
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#6c763e" }}>
            <img src="/images/ivy-brading-large.jpg" height={250} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={this.props.classes.paper} elevation={1}>
            <Grid container justify="center">
              <Typography variant="subtitle1" gutterBottom style={style.typographyStyle}>
                we believe that a trip should be more than just a destination.
                <br />
                we believe that the idea of leaving one place simply to go enjoy another is, well,
                boring.
                <br />
                we believe that a true trip shouldn't have just one destination.
                <br />
                we created ivy to disrupt your typical trip planning and experience more when you
                hit the road.
                <br />
                ivy lets you figure out where to go with more ease and spontaneity.
                <br />
                with ivy we make sure you find new spots and never go the same way twice.
                <br />
                we believe in detours, not destinations. we know ivy will make you a believer too.
                <br />
                <br />
                <Button
                  // className={classes.button}
                  style={style.buttonStyle}
                  variant="contained"
                  color="primary"
                  href="/signup"
                  justify="center"
                  className={this.props.classes.button}
                >
                  Sign Up
                </Button>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
