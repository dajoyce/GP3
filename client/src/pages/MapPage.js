import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core';

import IvyMap from "../components/IvyMap";
import API from '../utils/API';
import SideBar from '../components/SideBar';

//possible props
//Trip object
//POI
//Anything else?

const dummyTrip = {
  name: "Test Trip",
  nodes: [
    {
      lat: 35.7795897,
      lng: -78.63817870000003,
      place: "Raleigh"
    },
    {
      lat: 38.41258,
      lng: -82.70905,
      place: "Meads"
    },
    {
      lat: 39.96118,
      lng: -82.99879,
      place: "Columbus"
    },
    {
      lat: 42.33143,
      lng: -83.04575,
      place: "Detroit"
    }
  ],
}

const dummyPOIs = [
  {
    lat: 37.7795897,
    lng: -75.63817870000003,
    place: "Raleigh"
  },
  {
    lat: 35.41258,
    lng: -85.70905,
    place: "Meads"
  },
  {
    lat: 34.96118,
    lng: -83.99879,
    place: "Columbus"
  },
  {
    lat: 46.33143,
    lng: -86.04575,
    place: "Detroit"
  }
]

const containerStyle = {
  width: "100%",
  position: "absolute",
  top: 64,
  bottom: 0,
}

class MapPage extends Component {
  state = {
    trip: dummyTrip,
    POIs: dummyPOIs,
    sideBarTab: 0
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
      <Grid container spacing={0} style={containerStyle}>
        <Grid item xs={3}>
          <SideBar tab={this.state.sideBarTab} trip={this.state.trip} POIs={this.state.POIs} />
        </Grid>
        <Grid item xs={9}>
          <IvyMap nodes={this.state.trip.nodes} POIs={this.state.POIs} />
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(MapPage);