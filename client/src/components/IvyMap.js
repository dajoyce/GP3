import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import axios from 'axios';
import { TransitionGroup } from 'react-transition-group';
import { node } from 'prop-types';
import TripNotes from './MapDrawerTabs/TripNotes';
import { Dialog, DialogContentText, TextField, DialogContent } from '@material-ui/core';
import Autocomplete from 'react-google-autocomplete';
import { auth } from 'firebase';

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
      trip: props.trip || {
        name: "trip",
        owner: null,
        nodes: [
        ]
      }
    }

    this.places = new props.google.maps.places.PlacesService();
    this.bounds = new props.google.maps.LatLngBounds();
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

    axios.put('/api/places/savetrip', trip).then(res => {
      console.log(res);
      this.getNewNodes(res.data);
    })
  }

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
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2} />




          {/* <InfoWindow
          position={this.state.windowPosition}
          visible={this.state.showInfoWindow}>
          Here is {this.state.currentNode.city}

        </InfoWindow> */}


        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
})(IvyMap); 