import React, { Component } from 'react';
import IvyMap from "../components/IvyMap";
import SideBar from '../components/SideBar';

export default class MapPage extends Component {
    render() {
        return (
            <div>
                <SideBar />
                <IvyMap coords={[50, -50]} />
            </div>
        )
    }
}
