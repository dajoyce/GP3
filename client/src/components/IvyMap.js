import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import axios from 'axios';
import { Dialog, DialogContentText, DialogContent, Grid } from '@material-ui/core';
import Autocomplete from 'react-google-autocomplete';
import SideBar from '../components/SideBar';

export class IvyMap extends Component {

  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      zoom: props.zoom || 15,
      points: props.points || [],
      showInfoWindow: false,
      windowPosition: { lng: 0, lat: 0 },
      currentNode: {},
      value: 0,
      trip: props.trip || {
        name: "trip",
        owner: null,
        notes: "",
        nodes: [
        ]
      }
    }

    if (!this.state.trip.notes) {
      this.state.trip.notes = "";
    }

    this.places = new props.google.maps.places.PlacesService();
    this.bounds = new props.google.maps.LatLngBounds();
    this.saveInterval = 0;
  }

  componentDidMount = () => {

    if (this.state.trip.owner) {
      this.getNewNodes();
    } else {
      axios.get("/api/user/" + this.props.user.uid).then(res => {
        console.log(res);
        let trip = this.state.trip;
        trip.owner = res.data._id;
        this.setState({ trip });
      });
    }
  }

  componentWillUnmount() {
    axios.put('/api/places/savetrip', this.state.trip).then(res => {
      console.log(res.data);
      this.setState({ trip: res.data });
    });
  }

  getNewNodes = (trip = this.state.trip) => {
    console.log(trip);
    axios.get(`/api/places/findnodes`, {
      params: {
        lat: trip.nodes[trip.nodes.length - 1].lat,
        lng: trip.nodes[trip.nodes.length - 1].lng
      }
    }).then((response) => {
      this.bounds = new this.props.google.maps.LatLngBounds();
      console.log(response);
      response.data.forEach(point => {
        this.bounds.extend({ lat: point.latitude, lng: point.longitude })
      });
      this.setState({ trip, points: response.data })
    })
  }

  //   onMouseover = {(event) => this.handleMarkerHover(node, event)}
  // onMouseout = {() => {
  //   console.log("OUT");
  //   this.setState({ showInfoWindow: false })
  // }}

  createMarker = (node, ind) => {
    return (<Marker
      title={node.city}
      key={ind}
      name={node.name}
      position={{ lat: node.latitude, lng: node.longitude }}
      onClick={() => this.handleMarkerClick(node)}
      label={`${ind}`}
      fillColor="#6c763e"
    />);
  }

  handleMarkerHover = (node, event) => {
    this.setState({ showInfoWindow: true, windowPosition: event.position, currentNode: node })
  }

  handleMarkerClick = (node) => {
    var trip = this.state.trip;

    // console.log(trip);

    trip.nodes.push({ place: node.city, lat: node.latitude, lng: node.longitude });
    console.log(trip)

    this.saveTrip(trip);

    this.getNewNodes(trip);
  }

  saveTrip(trip) {
    let interval = setTimeout(() => {
      console.log("saved")
      axios.put('/api/places/savetrip', trip).then(res => {
        console.log(res.data);
        this.setState({ trip: res.data });
      });
    }, 3000);

    clearTimeout(this.saveInterval)
    this.saveInterval = interval;
  }

  handleNotes = (event, value) => {
    let trip = this.state.trip;
    if (event.target.name === "name") {
      trip.name = event.target.value;
    } else if (event.target.name === "notes") {
      trip.notes = event.target.value;
    }
    this.saveTrip(trip);
    this.setState({ trip })
  }

  handleTabs = (event, value) => {
    console.log(value);
    this.setState({ value });
  };

  render() {
    // console.log(this.state);
    //console.log(process.env);

    this.style = {
      height: "100%",
      width: window.innerWidth
    }

    return (

      <div>
        <Dialog
          open={!this.state.trip.nodes.length}

        >
          <DialogContent>
            <DialogContentText>
              Where would you like to start?
            </DialogContentText>

            <Autocomplete
              onPlaceSelected={(place) => {
                let trip = this.state.trip;
                console.log(place);
                trip.nodes.push({
                  place: place.address_components[0].short_name,
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng()
                });
                this.getNewNodes(trip);
              }}
              types={['geocode']}
            />
          </DialogContent>


        </Dialog>
        <Grid container spacing={16}>
          <Grid item xs={4}>
            <SideBar
              handleChange={this.handleTabs}
              value={this.state.value}
              trip={this.state.trip}
              points={this.state.points}
              handleNotes={this.handleNotes} />
          </Grid>
          <Grid item xs={8}>
            <Map
              google={this.props.google}
              bounds={this.bounds}
              style={this.style}>

              {this.state.trip.nodes.map((node, ind) => {
                return (<Marker
                  title={"Current Node"}
                  name={"Current Location"}
                  key={ind}
                  icon={{ path: this.props.google.maps.SymbolPath.CIRCLE, scale: 5 }}
                  position={{ lat: node.lat, lng: node.lng }}
                />);
              })}



              {this.state.points.map((node, ind) => {
                return this.createMarker(node, ind);
              })}

              <Polyline
                path={this.state.trip.nodes.map(node => {
                  return { lat: node.lat, lng: node.lng };
                })}
                strokeColor="#6c763e"
                strokeOpacity={1}
                strokeWeight={3} />




              {/* <InfoWindow
          position={this.state.windowPosition}
          visible={this.state.showInfoWindow}>
          Here is {this.state.currentNode.city}

        </InfoWindow> */}


            </Map>
          </Grid>
        </Grid>
      </div >
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
})(IvyMap); 