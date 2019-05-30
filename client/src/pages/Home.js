import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import DeveloperCards from "../components/Developers/DevelopersCards";

const style = {
  buttonStyle: {
    background: "#6c763e",
    marginTop: 15
  },
  typographyStyle: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30
  }
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters()
  },
  paper: {
    padding: theme.spacing.unit * 2
  },
  body: {
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
});

class Home extends Component {
  render() {

    return (
      <Grid container justify="center" style={{ padding: 0 }}>
        <Grid item xs={12}>
          <div className={this.props.classes.body}>
            <img
              src="/images/circle-logo-ivy-trans.png"
              alt="Highway Background"
              className={this.props.classes.brandImage}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Paper className={this.props.classes.paper} elevation={1}>
            <Grid container justify="center" direction="column">
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

        <Grid item xs={12}>
          <Paper className={this.props.classes.paper} elevation={1}>
            <Typography variant="h5" gutterBottom style={style.typographyStyle}>
              About Our Developers
            </Typography>
            <Grid container justify="center" spacing={16}>
              <DeveloperCards />
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
