import React, { Component } from 'react';
import ReactDom from 'react-dom';

export default class IvyMap extends Component {

  //Lifecycle functions
  componentDidUpdate(prevProps) {
    if (prevProps.POIs !== this.props.POIs) {
      this.drawPOIs(this.props.POIs);
    }
  }

  componentDidMount() {
    this.gMaps = window.google.maps;
    const mapNode = ReactDom.findDOMNode(this.refs.map);

    this.map = new this.gMaps.Map(mapNode, { center: this.props.nodes[0], zoom: 8, disableDefaultUI: true });

    this.drawTrip(this.props.nodes);
    this.drawPOIs(this.props.POIs);
  }


  render() {
    return (
      <div ref="map" style={{ height: 'calc(100vh - 64px)' }} id="743987">
        Loading...
        </div>
    )
  }

  //Drawing functions
  drawPOIs(nodes) {
    if (this.POIMarkers) {
      this.POIMarkers.forEach(marker => {
        marker.setMap(null);
      });

      this.POIMarkers = null;
    }

    this.POIMarkers = nodes.map(node => {
      return this.createMarker(node);
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

    console.log(nodes);

    this.map.setCenter(nodes[nodes.length - 1]);
  }

  createMarker(node, symbol = null) {
    console.log(node);
    let markerProps = {
      position: { lat: node.lat, lng: node.lng },
      map: this.map,
      title: node.place
    }

    if (symbol !== null) {
      markerProps.icon = { path: symbol, scale: 5 };
    }

    return new this.gMaps.Marker(markerProps);
  }
}
