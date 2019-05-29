import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { node } from 'prop-types';

export default class IvyMap extends Component {

  //Lifecycle functions
  componentDidUpdate() {

  }

  componentDidMount() {
    this.gMaps = window.google.maps;
    const mapNode = ReactDom.findDOMNode(this.refs.map);

    this.map = new this.gMaps.Map(mapNode, { center: this.props.nodes[0], zoom: 8 });

    this.drawTrip(this.props.nodes);
    this.drawPOIs(this.props.POIs);
  }


  render() {
    return (
      <div ref="map" style={{ height: "100%", width: "100%" }}>
        Loading...
        </div>
    )
  }

  //Drawing functions
  drawPOIs(nodes) {
    nodes.forEach(node => {
      this.createMarker(node);
    });
  }

  drawTrip(nodes) {
    nodes.forEach(node => {
      this.createMarker(node, this.gMaps.SymbolPath.CIRCLE);
    });

    new this.gMaps.Polyline({
      path: nodes,
      strokeColor: "#6c763e",
      strokeOpacity: 1.0,
      strokeWeight: 3,
      map: this.map
    });

    this.map.setCenter(nodes[nodes.length - 1]);
  }

  createMarker(node, symbol = null) {
    console.log(node);
    let markerProps = {
      position: { lat: node.lat || node.latitude, lng: node.lng || node.longitude },
      map: this.map,
      title: node.place || node.city
    }

    if (symbol !== null) {
      markerProps.icon = { path: symbol, scale: 5 };
    }

    return new this.gMaps.Marker(markerProps);
  }
}
