import React, { Component } from 'react';
import ReactDom from 'react-dom';

export default class IvyMap extends Component {

  //Lifecycle functions
  componentDidUpdate(prevProps) {
    if (prevProps.nodes.length === 0 && this.props.nodes.length > 0) {
      this.drawTrip(this.props.nodes);
    } else if (this.polyline) {
      if (prevProps.POIs !== this.props.POIs) {
        this.drawPOIs(this.props.POIs);
      }

      if (this.polyline.getPath().length < this.props.nodes.length) {
        this.extendTrip(this.props.nodes[this.props.nodes.length - 1]);
      }
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

    let bounds = new this.gMaps.LatLngBounds();

    this.POIMarkers = nodes.map((node, ind) => {
      let marker = this.createMarker(node);

      marker.setLabel('' + ind);
      marker.addListener('click', () => this.props.POIHandle(node));

      bounds.extend(node);

      return marker;
    });

    this.map.fitBounds(bounds, 10);

  }

  drawTrip(nodes) {
    nodes.forEach(node => {
      this.createMarker(node, this.gMaps.SymbolPath.CIRCLE);
    });

    this.polyline = new this.gMaps.Polyline({
      path: nodes,
      strokeColor: "#6c763e",
      strokeOpacity: 1.0,
      strokeWeight: 3,
      map: this.map
    });

    this.map.setCenter(nodes[nodes.length - 1]);
  }

  extendTrip(node) {
    this.polyline.getPath().push(new this.gMaps.LatLng(node));
    this.createMarker(node, this.gMaps.SymbolPath.CIRCLE);
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

    return new this.gMaps.Marker(markerProps);
  }
}
