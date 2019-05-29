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
  minHeight: "100%",
  width: "100%"
}

class MapPage extends Component {
  state = {
    trip: dummyTrip,
    POIs: dummyPOIs,
    sideBarTab: 0
  }

  componentDidMount() {

    this.refreshPOIs();
  }

  refreshPOIs() {
    API.getPOIs(this.state.trip.nodes[this.state.trip.nodes.length - 1]).then((response) => {
      console.log(this.state);
      this.setState({ POIs: response })
    });;
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
        <Grid item xs={4} md={3} style={{ position: "relative" }}>
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
        <Grid item xs={8} md={9} style={{ position: "relative" }}>
          <IvyMap nodes={this.state.trip.nodes} POIs={this.state.POIs} />
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(MapPage);