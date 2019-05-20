import React, { Component } from 'react';
import ReactDom from 'react-dom';

export default class IvyMap extends Component {


  componentDidMount() {
    this.gMaps = window.google.maps;
    
    const mapNode = ReactDom.findDOMNode(this.refs.map);

    this.map = new this.gMaps.Map(mapNode, {center: {lat: 35, lng: 65}, zoom: 8});
  }

  render() {
    return (
      <div ref="map" {...this.props}>
        Loading...
      </div>
    )
  }
}
