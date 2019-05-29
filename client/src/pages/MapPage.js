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
  notes: "-_-"
}

const dummyPOIs = [
  {
    latitude: 37.7795897,
    longitude: -75.63817870000003,
    city: "Raleigh"
  },
  {
    latitude: 35.41258,
    longitude: -85.70905,
    city: "Meads"
  },
  {
    latitude: 34.96118,
    longitude: -83.99879,
    city: "Columbus"
  },
  {
    latitude: 46.33143,
    longitude: -86.04575,
    city: "Detroit"
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

  }

  //handlers
  handleSideBar = (event, value) => {
    this.setState({ sideBarTab: value });
  }

  makeHandler = (variable) => {

    return (event) => {
      let trip = this.state.trip;

      trip[variable] = event.target.value;
      this.setState({
        trip
      })
    };
  }

  render() {
    return (
      <Grid container spacing={0} style={containerStyle}>
        <Grid item xs={3}>
          <SideBar
            nodes={this.state.trip.nodes}
            name={this.state.trip.name}
            notes={this.state.trip.notes}
            POIs={this.state.POIs}
            tab={this.state.sideBarTab}
            handleTab={this.handleSideBar}
            handleName={this.makeHandler("name")}
            handleNotes={this.makeHandler("notes")}
          />
        </Grid>
        <Grid item xs={9}>
          <IvyMap nodes={this.state.trip.nodes} POIs={this.state.POIs} />
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(MapPage);