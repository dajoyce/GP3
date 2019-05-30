import React, { Component } from 'react';
import ReactDom from 'react-dom';

export default class IvyMap extends Component {

  //Lifecycle functions
  componentDidUpdate(prevProps) {
    if (this.props.nodes.length > 0) {
      this.drawTrip(this.props.nodes);
    }

    if (this.props.POIs.length > 0) {
      this.drawPOIs(this.props.POIs)
    }
  }

  componentDidMount() {
    this.gMaps = window.google.maps;
    const mapNode = ReactDom.findDOMNode(this.refs.map);

    this.map = new this.gMaps.Map(mapNode, {
      center: { lat: 35.78, lng: -78.63 },
      zoom: 8,
      disableDefaultUI: true
    });

    if (!(this.props.nodes)) {
      this.drawTrip(this.props.nodes);
      this.drawPOIs(this.props.POIs);
    }

    this.lines = [];

    this.directions = new this.gMaps.DirectionsService();
  }

  componentWillUnmount() {
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
    console.log('here');
    if (this.POIMarkers) {
      this.POIMarkers.forEach(marker => {
        marker.setMap(null);
      });

      this.POIMarkers = null;
    }

    let bounds = new this.gMaps.LatLngBounds();

    this.POIMarkers = nodes.map((node, ind) => {
      let marker = this.createMarker(node);

      marker.setLabel('' + ind);
      marker.addListener('click', () => this.props.POIHandle(node));

      bounds.extend(node);

      return marker;
    });

    this.map.panToBounds(bounds, 10);

  }

  drawTrip(nodes) {
    nodes.forEach(node => {
      this.createMarker(node, this.gMaps.SymbolPath.CIRCLE);
    });

    this.drawDirections(nodes);

    this.map.setCenter(nodes[nodes.length - 1]);
  }

  drawDirections(nodes) {

    let request = {
      origin: new this.gMaps.LatLng(nodes[0]),
      destination: new this.gMaps.LatLng(nodes[nodes.length - 1]),
      waypoints: nodes.slice(1, nodes.length).map((val) => {
        return { location: new this.gMaps.LatLng(val), stopover: false };
      }),
      travelMode: 'DRIVING'
    }

    this.directions.route(request, (res, stat) => {
      if (stat == 'OK') {
        this.lines.push(new this.gMaps.Polyline({
          path: res.routes[0].overview_path,
          strokeColor: "#6c763e",
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: this.map
        }));
      }
    });

  }

  extendTrip(node) {
    this.createMarker(node, this.gMaps.SymbolPath.CIRCLE);
    this.drawDirections([this.props.nodes[this.props.nodes.length - 2], node]);
  }

  createMarker(node, symbol = null) {
    let markerProps = {
      position: { lat: node.lat, lng: node.lng },
      map: this.map,
      title: node.place,
      animation: this.gMaps.Animation.DROP
    }

    if (symbol !== null) {
      markerProps.icon = { path: symbol, scale: 5 };
    }

    let marker = new this.gMaps.Marker(markerProps);

    return marker;
  }
}
