import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Typography, Card, CardContent } from '@material-ui/core';

import React, { Component } from 'react'

// class PlaceTile extends Component {

//   componentDidMount() {
//   }

//   renderContent() {
//     const { dimensions } = this.state;

//     return (
//       <div style={{ height: 100, width: dimensions.width }}>
//         <Map
//           google={this.props.google}
//           initialCenter={{ lat: this.props.lat, lng: this.props.lng }}
//           style={{ height: 100, width: dimensions.width }}
//           disableDefaultUI
//           draggable={false} />
//       </div>
//     );
//   }

//   render() {
//     const { dimensions } = this.state;
//     return (
//       <div >
//         <Card >
//           {dimensions && this.renderContent()}
//           <CardContent>
//             <Typography variant="h6">
//               {this.props.title}
//             </Typography>
//           </CardContent>
//         </Card >
//       </div>
//     )
//   }
// }

const mapStyle = {
  position: "absolute",
  top: 0,
  height: 100,
  width: "100%"
}

const cardStyle = {
  position: "relative",
  width: "100%",
  height: 200
}

function PlaceTile(props) {
  return (
    <div >
      <Card style={cardStyle}>
        <Map
          google={props.google}
          initialCenter={{ lat: props.lat, lng: props.lng }}
          style={mapStyle}
          disableDefaultUI
          draggable={false} />
        <CardContent style={{ position: "absolute", top: 100 }}>
          <Typography variant="h6">
            {props.title}
          </Typography>
        </CardContent>
      </Card >
    </div>
  )
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
})(PlaceTile)