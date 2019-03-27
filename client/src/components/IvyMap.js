import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';

export class IvyMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPoint: props.currentPoint || { lat: 35.7806, lng: -78.6369 },
      zoom: props.zoom || 15,
      points: props.points || []
    }
  }

  render() {
    console.log(this.props.google);
    return (
      <Map
        google={this.props.google}
        zoom={this.state.zoom}
        initialCenter={this.state.currentPoint}>

        <Marker
          title={"Current Node"}
          name={"Current Location"}
          position={this.state.currentPoint}
        />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
})(IvyMap);