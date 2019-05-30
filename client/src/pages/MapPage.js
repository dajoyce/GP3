import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Grid, Dialog, TextField, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import qs from "query-string";

import IvyMap from "../components/IvyMap";
import API from '../utils/API';
import SideBar from '../components/SideBar';

//possible props
//Trip object
//POI
//Anything else?

const containerStyle = {
  minHeight: "100%",
  width: "100%"
}

class MapPage extends Component {
  state = {
    trip: null,
    POIs: [],
    sideBarTab: 0,
    open: false
  }

  componentDidMount() {
    let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id
    console.log(id);
    API.getUser(this.props.user.uid).then(response => this.userID = response.data._id)
    if (id) {
      API.getTrip(id).then(response => {
        this.setState({ trip: response.data });
        this.refreshPOIs(response.data.nodes[response.data.nodes.length - 1]);
      })
    } else {
      this.setState({ open: true });
    }
  }

  componentWillUnmount() {
    if (this.state.trip) {
      this.saveTrip(0);
    }
  }

  refreshPOIs(node = this.state.trip.nodes[this.state.trip.nodes.length - 1]) {
    API.getPOIs(node).then((response) => {
      console.log(this.state);
      this.setState({ POIs: response })
    });;
  }

  setUpAuto(input) {
    if (input) {
      let auto = new window.google.maps.places.Autocomplete(input)
      auto.setFields(['geometry', 'name']);

      auto.addListener('place_changed', () => {
        let location = auto.getPlace().geometry.location;
        let node = { lat: location.lat(), lng: location.lng(), place: auto.getPlace().name }

        let trip = {
          name: "My Road Trip",
          nodes: [
            node
          ],
          notes: "Notes"
        };

        this.setState({ trip, open: false });
        this.refreshPOIs(node);
      })
    }
  }

  saveTrip(timeout = 2000) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    let trip = this.state.trip;
    trip.owner = this.userID;

    this.timeout = setTimeout(() => {
      API.saveTrip(trip).then((response) => {
        if (!(this.state.trip._id)) {
          let trip = this.state.trip;
          trip._id = response.data._id;
          this.setState({ trip });
        }
        console.log("saved");
      });
    }, timeout)
  }

  //handlers
  handleSideBar = (event, value) => {
    this.setState({ sideBarTab: value });
  }

  POIHandler = (node) => {
    let trip = this.state.trip;

    trip.nodes.push(node);

    this.saveTrip();

    this.setState({ trip });
    this.refreshPOIs(node);
  }

  makeHandler = (variable) => {
    return (event) => {
      let trip = this.state.trip;

      trip[variable] = event.target.value;
      this.setState({
        trip
      });
      this.saveTrip();
    };
  }

  render() {
    return (
      <Grid container spacing={0} style={containerStyle}>
        <Grid item xs={4} md={3} lg={2} style={{ position: "relative" }}>
          {(this.state.trip) ? <SideBar
            nodes={this.state.trip.nodes}
            name={this.state.trip.name}
            notes={this.state.trip.notes}
            POIs={this.state.POIs}
            tab={this.state.sideBarTab}
            handleTab={this.handleSideBar}
            handleName={this.makeHandler("name")}
            handleNotes={this.makeHandler("notes")}
          /> : ""}

        </Grid>
        <Grid item xs={8} md={9} lg={10} style={{ position: "relative" }}>
          <IvyMap
            nodes={(this.state.trip) ? this.state.trip.nodes : []}
            POIs={this.state.POIs}
            POIHandle={this.POIHandler}
          />
        </Grid>


        <Dialog
          open={this.state.open}>
          <DialogTitle id="form-dialog-title">Start your trip!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Where would you like to begin?
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="autocomplete"
              label="Starting Location"
              inputRef={input => { this.setUpAuto(input) }}
              fullWidth
            />
          </DialogContent>

        </Dialog>
      </Grid>
    )
  }
}

export default withRouter(MapPage);