import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
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
    this.bounds = new this.props.google.maps.LatLngBounds();
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
      this.bounds = new this.props.google.maps.LatLngBounds();
      response.data.forEach(point => {
        this.bounds.extend({ lat: point.latitude, lng: point.longitude })
      });
      this.setState({ points: response.data })
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
      onClick={() => this.handleMarkerCick(node)}
    />);
  }

  handleMarkerHover = (node, event) => {
    this.setState({ showInfoWindow: true, windowPosition: event.position, currentNode: node })
  }

  handleMarkerCick = (node) => {
    var trip = this.state.trip;

    console.log(trip);

    trip.nodes.push({ place: node.city, lat: node.latitude, lng: node.longitude })

    this.setState({ trip: trip });

    this.getNewNodes();
  }

  render() {
    // console.log(this.state);
    //console.log(process.env);\

    return (
      <Map
        google={this.props.google}
        bounds={this.bounds}>


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
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
})(IvyMap); 