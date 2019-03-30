import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import { TransitionGroup } from 'react-transition-group';
import { node } from 'prop-types';
import TripNotes from './MapDrawerTabs/TripNotes';

export class IvyMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      zoom: props.zoom || 15,
      points: props.points || [],
      showInfoWindow: false,
      windowPosition: { lng: 0, lat: 0 },
      currentNode: {},
      trip: {
        owner: null,
        nodes: [
          {
            place: "Raleigh, NC",
            lat: 35.7806, lng: -78.6369
          }
        ]
      }
    }

    this.places = new this.props.google.maps.places.PlacesService();
  }

  componentDidMount = () => {
    this.getNewNodes()
  }

  getNewNodes = () => {
    console.log(this.state.trip.nodes[this.state.trip.nodes.length - 1]);
    axios.get(`/api/places/findnodes`, {
      params: {
        lat: this.state.trip.nodes[this.state.trip.nodes.length - 1].lat,
        lng: this.state.trip.nodes[this.state.trip.nodes.length - 1].lng
      }
    }).then((response) => {
      this.setState({ points: response.data })
    })
  }

  createMarker = (node) => {
    return (<Marker
      title={node.city}
      key={node.name}
      name={node.name}
      position={{ lat: node.latitude, lng: node.longitude }}
      onMouseover={(event) => this.handleMarkerHover(node, event)}
      onMouseout={() => {
        console.log("OUT");
        this.setState({ showInfoWindow: false })
      }}
    />);
  }

  handleMarkerHover = (node, event) => {
    this.setState({ showInfoWindow: true, windowPosition: event.position, currentNode: node })
  }

  handleMarkerCick = (node) => {
    var trip = this.state.trip;

    trip.nodes.append({ place: node.city, lat: node.latitude, lng: node.longitude })

    this.setState({ trip: trip });


  }

  render() {
    // console.log(this.state);
    //console.log(process.env);
    var bounds = new this.props.google.maps.LatLngBounds();
    this.state.points.forEach(point => {
      bounds.extend({ lat: point.latitude, lng: point.longitude })
    });

    return (
      <Map
        google={this.props.google}
        initialCenter={this.state.currentPoint}
        bounds={bounds}>


        {this.state.trip.nodes.map(node => {
          return (<Marker
            title={"Current Node"}
            name={"Current Location"}
            key={{ lat: node.lat, lng: node.lng }}
            position={{ lat: node.lat, lng: node.lng }}
          />);
        })}



        {this.state.points.map(node => {
          return this.createMarker(node);
        })}


        <InfoWindow
          position={this.state.windowPosition}
          visible={this.state.showInfoWindow}>
          Here is {this.state.currentNode.city}

        </InfoWindow>


      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDUYM0pSulwL2VmCigpdn5Ji0EVyE4lh6U"//process.env.REACT_APP_GOOGLE_MAPS_KEY
})(IvyMap); 