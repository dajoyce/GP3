import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});


class Signup extends Component {
  state = {
<<<<<<< Updated upstream
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
=======
    name: "Jane Smith",
    multiline: "Controlled"
>>>>>>> Stashed changes
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    console.log(this);

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        />

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

      </form>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
