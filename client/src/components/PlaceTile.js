import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Typography, Card, CardContent } from '@material-ui/core';

import React, { Component } from 'react'

class PlaceTile extends Component {
  state = {
    dimensions: null
  }

  componentDidMount() {
    this.setState({
      dimensions: {
        width: this.container.offsetWidth,
      },
    });
  }

  renderContent() {
    const { dimensions } = this.state;

    return (
      <div style={{ height: 100, width: dimensions.width }}>
        <Map
          google={this.props.google}
          initialCenter={{ lat: this.props.lat, lng: this.props.lng }}
          style={{ height: 100, width: dimensions.width }}
          disableDefaultUI
          draggable={false} />
      </div>
    );
  }

  render() {
    const { dimensions } = this.state;
    return (
      <div ref={el => (this.container = el)}>
        <Card >
          {dimensions && this.renderContent()}
          <CardContent>
            <Typography variant="h6">
              {this.props.title}
            </Typography>
          </CardContent>
        </Card >
      </div>
    )
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
})(PlaceTile)