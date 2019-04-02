import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TripNotes from './MapDrawerTabs/TripNotes';

const drawerWidth = 100;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

class MapSideDrawer extends Component {
    constructor(props) {
        super(props);
        this.classes = props;
        this.state = {
            value: 0,
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        return (
            <div className={this.classes.root} >
                <CssBaseline />
                <Drawer
                    className={this.classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: this.classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={this.classes.toolbar} />
                    <Divider />

                    <Paper className={this.classes.root}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Item One" />
                            <Tab label="Item Two" />
                            <Tab label="Item Three" />
                        </Tabs>
                    </Paper>



                </Drawer>
            </div >
        );
    }
}

MapSideDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapSideDrawer);
