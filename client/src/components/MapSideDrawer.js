import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const drawerWidth = 480;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
});

class ClippedDrawer extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
        console.log(this.state);
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />

                    <Paper square className={classes.root}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            variant="fullWidth"
                            indicatorColor="secondary"
                            textColor="secondary"
                        >
                            <Tab label="Info" />
                            <Tab label="Points of Interest" />
                            <Tab label="Trip Notes" />
                        </Tabs>
                    </Paper>
                </Drawer>
            </div>
        )
    };
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);