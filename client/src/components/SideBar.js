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
        nodes.map((node, index, array) => {
          return (<Grid item xs={12} key={index} >
            <PlaceTile title={node.place} lat={node.lat} lng={node.lng} distance={(index === 0) ? 'Start' :
              '~' + Math.round(window.google.maps.geometry.spherical.computeDistanceBetween(new window.google.maps.LatLng(node), new window.google.maps.LatLng(array[index - 1])) / 1000) + 'km'} />
          </Grid>
          )
        })
      }
    </Grid>

  )
}

function POIs(nodes, trip) {
  return (
    <Grid container direction="column" spacing={16} alignItems="stretch">
      {nodes.map((node, index) => {
        return (
          <Grid item xs={12} key={index}>
            <PlaceTile title={node.place} lat={node.lat} lng={node.lng} distance={
              '~' + Math.round(window.google.maps.geometry.spherical.computeDistanceBetween(new window.google.maps.LatLng(node), new window.google.maps.LatLng(trip[trip.length - 1])) / 1000) + 'km'} />
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
    <div style={{
      overflowY: "scroll", position: "absolute", top: 0, bottom: 0, width: "100%"
    }}>
      <AppBar position="static" color="default">
        <Tabs value={props.tab} variant="fullWidth" onChange={props.handleTab}>

          <Tab label="Info" style={tabStyle} />
          <Tab label="Points of Interest" style={tabStyle} />
          <Tab label="Notes" style={tabStyle} />
        </Tabs>
      </AppBar>
      <div style={{ padding: 16 }}>
        {props.tab === 0 && info(props.nodes, props.name, props.handleName)}
        {props.tab === 1 && POIs(props.POIs, props.nodes)}
        {props.tab === 2 && notes(props.notes, props.handleNotes)}
      </div>
    </div >
  )
}
