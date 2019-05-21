import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { node } from 'prop-types';

export default class IvyMap extends Component {

  componentDidUpdate() {

  }

  componentDidMount() {
    //DEBUGGING DUMMY TRIP REMOVE LATER
    this.gMaps = window.google.maps;

    const mapNode = ReactDom.findDOMNode(this.refs.map);

    console.log(this.props);

    this.map = new this.gMaps.Map(mapNode, { center: this.props.nodes[0], zoom: 8 });

    this.drawTrip(this.props.nodes);

    this.drawPOIs(this.props.POIs);
  }

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
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: this.map
    });

    this.map.setCenter(nodes[nodes.length - 1]);
  }

  createMarker(node, symbol = null) {
    return new this.gMaps.Marker({
      position: { lat: node.lat, lng: node.lng },
      map: this.map,
      title: node.place,
      icon: (symbol) ? null : { path: symbol, scale: 7 }
    });
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div ref="map" {...this.props} style={{ height: "100%", width: "100%" }}>
        Loading...
        </div>
    )
  }
}
