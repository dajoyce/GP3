import React, { Component } from 'react'
import ReactDom from 'react-dom';
import { Card, CardContent, Typography } from '@material-ui/core'

const mapStyle = {
  position: "absolute",
  top: 0,
  height: 100,
  width: "100%"
}

const cardStyle = {
  position: "relative",
  width: "100%",
  height: 200,
  backgroundColor: "#fefefe"
}

export default class PlaceTile extends Component {

  componentDidMount() {
    const mapNode = ReactDom.findDOMNode(this.refs.map);

    this.map = new window.google.maps.Map(mapNode, {
      center: this.props,
      zoom: 10,
      disableDefaultUI: true,
      draggable: false
    });
  }

  render() {
    return (
      <Card style={cardStyle}>
        <div ref="map" style={mapStyle}>
          Loading Map...
          </div>
        <CardContent style={{ position: "absolute", top: 100 }}>
          <Typography variant="h6">
            {this.props.title}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}
