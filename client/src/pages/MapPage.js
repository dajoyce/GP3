import React, { Component } from 'react';
import IvyMap from "../components/IvyMap";
import SideBar from '../components/MapSideDrawer';

export default class MapPage extends Component {
    render() {
        return (
            <div>
                {/* <SideBar /> */}
                <IvyMap currentPoint={{ lat: 35.7806, lng: -78.6369 }} />
            </div>
        )
    }
}

