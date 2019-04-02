import React, { Component } from 'react';
import IvyMap from "../components/IvyMap";
import { withRouter } from 'react-router-dom'
import SideBar from '../components/MapSideDrawer';
import API from '../utils/API';

class MapPage extends Component {
    state = {
        trip: null
    }

    componentDidMount() {
        let params = new URLSearchParams(this.props.location.search);

        const id = params.get('id');

        console.log(id);

        if (id) {
            API.getTrip(id).then(val => {
                if (val && val != "") {
                    console.log(val);
                    this.setState({ trip: val.data })
                }
            })
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>
                {/* <SideBar /> */}
                <IvyMap trip={this.state.trip} {...this.props} key={this.state.trip ? this.state.trip._id : 0} />
            </div>
        )
    }
}

export default withRouter(MapPage);