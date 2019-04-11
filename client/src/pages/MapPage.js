import React, { Component } from 'react';
import IvyMap from "../components/IvyMap";
import { withRouter } from 'react-router-dom'
import API from '../utils/API';

const containerStyle = {
  width: "100%",
  position: "absolute",
  top: 64,
  bottom: 0,
}

class MapPage extends Component {
  state = {
    trip: null
  }

  componentDidMount() {
    let params = new URLSearchParams(this.props.location.search);

    const id = params.get('id');

    console.log(id);

    if (id) {
      API.getTrip(id).then(val => {
        if (val && val != "") {
          console.log(val);
          this.setState({ trip: val.data })
        }
      })
    }
  }

  render() {
    console.log(this.state);
    return (
      <IvyMap style={containerStyle} trip={this.state.trip} {...this.props} key={this.state.trip ? this.state.trip._id : 0} />
    )
  }
}

export default withRouter(MapPage);