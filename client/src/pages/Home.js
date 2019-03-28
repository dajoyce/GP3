import React, { Component } from "react";
//import { makeStyles } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },

  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },

  button: {
    margin: theme.spacing.unit
  },

  input: {
    display: "none"
  }
});

class Home extends Component {
  render() {
    return (
      <div>
        <Paper className={this.props.root} elevation={1}>
          <Typography variant="h3" gutterBottom>
            Welcome to Ivy
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Selvage activated charcoal food truck marfa, hella man braid chicharrones. Meh neutra
            humblebrag, normcore four dollar toast lumbersexual pickled banh mi paleo pinterest
            hexagon selvage biodiesel. Affogato glossier before they sold out, hot chicken
            post-ironic try-hard cornhole irony cliche venmo flexitarian mixtape letterpress
            humblebrag. Microdosing live-edge lyft tbh celiac iceland unicorn shoreditch chia
            skateboard succulents marfa copper mug slow-carb. Plaid 8-bit pabst pop-up kitsch poke
            direct trade brooklyn. Art party coloring book disrupt portland stumptown fam freegan,
            organic you probably haven't heard of them shaman keffiyeh. Microdosing taxidermy
            taiyaki, plaid pitchfork seitan distillery sartorial polaroid meh retro flexitarian.
          </Typography>

          <Button variant="contained" color="primary" className={classes.button}>
            Submit
          </Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
