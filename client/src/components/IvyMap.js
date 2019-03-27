import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

export default class IvyMap extends Component {
  state = {
    coords: [35.787743, -78.644257],
    zoom: 13
  }

  render() {
    return (
      <Map center={this.state.coords} zoom={13} style={{ height: "100vh" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={this.state.coords}>
          <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
      </Map >
    )
  }
}
