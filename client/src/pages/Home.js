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
    console.log(this.props)
    return (
      <Grid className={this.props.classes.root} container justify="center">
        <Grid item xs={12} sm={6}>
          <Paper className={this.props.classes.paper} elevation={1}>
            <Grid container justify="center">
              <Grid item xs={12} sm={6}>
                <img src="/images/ivy-brading-large.jpg" width={"100%"}></img>
              </Grid>
              <Typography variant="subtitle1" gutterBottom>
                Selvage activated charcoal food truck marfa, hella man braid chicharrones. Meh neutra humblebrag, normcore
                four dollar toast lumbersexual pickled banh mi paleo pinterest hexagon selvage biodiesel. Affogato glossier
                before they sold out, hot chicken post-ironic try-hard cornhole irony cliche venmo flexitarian mixtape
                letterpress humblebrag. Microdosing live-edge lyft tbh celiac iceland unicorn shoreditch chia skateboard
                succulents marfa copper mug slow-carb. Plaid 8-bit pabst pop-up kitsch poke direct trade brooklyn. Art party
                coloring book disrupt portland stumptown fam freegan, organic you probably haven't heard of them shaman
                keffiyeh. Microdosing taxidermy taiyaki, plaid pitchfork seitan distillery sartorial polaroid meh retro
                flexitarian.
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
