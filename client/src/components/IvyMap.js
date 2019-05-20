import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { node } from 'prop-types';

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

export default class IvyMap extends Component {

  componentDidUpdate() {

  }

  componentDidMount() {
    //DEBUGGING DUMMY TRIP REMOVE LATER
    this.trip = dummyTrip;

    this.gMaps = window.google.maps;

    const mapNode = ReactDom.findDOMNode(this.refs.map);

    this.map = new this.gMaps.Map(mapNode, { center: this.trip.nodes[0], zoom: 8 });

    this.drawTrip(this.trip.nodes);
  }

  drawTrip(nodes) {
    nodes.forEach(node => {
      this.createMarker(node);
    });

    new this.gMaps.Polyline({
      path: nodes,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: this.map
    });

    this.map.setCenter(nodes[nodes.length - 1]);
  }

  createMarker(node) {
    return new this.gMaps.Marker({
      position: { lat: node.lat, lng: node.lng },
      map: this.map,
      title: node.place
    });
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div ref="map" {...this.props}>
        Loading...
        </div>
    )
  }
}
