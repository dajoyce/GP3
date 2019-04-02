import React from 'react'
import { Tab, Tabs, Grid, Typography, TextField } from '@material-ui/core';
import PlaceTile from './PlaceTile';

function info(trip, handle) {
  return (
    <Grid container direction="column" spacing={16} alignItems="stretch">
      <Grid item xs={12}>
        < TextField
          id="standard-name"
          label="Trip Name"
          value={trip.name}
          onChange={handle}
          margin="normal"
          name="name"
        />
      </Grid>
      {
        trip.nodes.map((place, index) => {
          return (<Grid item xs={12} key={index}>
            < PlaceTile title={place.place} lat={place.lat} lng={place.lng} />
          </Grid>
          )
        })
      }
    </Grid >

  )
}

function POIs(points) {
  console.log(points);
  return (
    <Grid container direction="column">
      {points.map((place, index) => {
        return (<Grid item xs={12} key={index}>
          < PlaceTile title={place.city} lat={place.latitude} lng={place.longitude} />
        </Grid>
        )
      })}
    </Grid>
  )
}

function notes(handleNotes, notes) {
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
      <div>
        <Tabs value={props.value} onChange={props.handleChange} variant="fullWidth">

          <Tab label="Info" />
          <Tab label="Points of Interest" />
          <Tab label="Notes" />
        </Tabs>
        {props.value === 0 && info(props.trip, props.handleNotes)}
        {props.value === 1 && POIs(props.points)}
        {props.value === 2 && notes(props.handleNotes, props.trip.notes)}
      </div>
    </div>
  )
}
