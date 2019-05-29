import React from 'react'
import { Tab, Tabs, Grid, Typography, TextField, AppBar } from '@material-ui/core';
import PlaceTile from './PlaceTile';

const tabStyle = {
  minWidth: "33%",
}

//tab renderers
function info(nodes, name, handle) {
  return (
    <Grid container direction="column" spacing={16} alignItems="stretch">
      <Grid item xs={12}>
        <TextField
          id="standard-name"
          label="Trip Name"
          value={name}
          onChange={handle}
          margin="normal"
          name="name"
        />
      </Grid>
      {
        nodes.map((node, index) => {
          return (<Grid item xs={12} key={index}>
            <PlaceTile title={node.place} lat={node.lat} lng={node.lng} />
          </Grid>
          )
        })
      }
    </Grid>

  )
}

function POIs(nodes) {
  return (
    <Grid container direction="column" spacing={16} alignItems="stretch">
      {nodes.map((node, index) => {
        return (
          <Grid item xs={12} key={index}>
            <PlaceTile title={node.city} lat={node.latitude} lng={node.longitude} />
          </Grid>
        )
      })}
    </Grid>
  )
}

function notes(notes, handleNotes) {
  return (
    <Grid container direction="column">
      <Typography variant="h6">
        Trip Notes
      </Typography>
      <TextField
        id="standard-multiline-flexible"
        label="Notes"
        multiline
        rowsMax="4"
        value={notes}
        onChange={handleNotes}
        margin="normal"
        name="notes"
      />
    </Grid>
  )
}

export default function SideBar(props) {
  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs value={props.tab} variant="fullWidth" onChange={props.handleTab}>

          <Tab label="Info" style={tabStyle} />
          <Tab label="Points of Interest" style={tabStyle} />
          <Tab label="Notes" style={tabStyle} />
        </Tabs>
      </AppBar>
      <div style={{ padding: 16 }}>
        {props.tab === 0 && info(props.nodes, props.name, props.handleName)}
        {props.tab === 1 && POIs(props.POIs)}
        {props.tab === 2 && notes(props.notes, props.handleNotes)}
      </div>
    </div>
  )
}
