import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';

export default class TripNotes extends Component {
  state = {
    notes: ""
  }

  handleChange = (event) => {

    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        TRIP NOTES

        <TextField
          id="filled-multiline-flexible"
          label="Trip Notes"
          multiline
          name="notes"
          rowsMax="4"
          value={this.state.notes}
          onChange={this.handleChange}
          margin="normal"
        />
      </div>
    )
  }
}
