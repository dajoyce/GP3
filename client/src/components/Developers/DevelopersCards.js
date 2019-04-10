import React, { Component } from "react";
//import { makeStyles } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Developers from "./developers.json";
import Grid from "@material-ui/core/Grid";

const styles = {
  card: {
    maxWidth: 220,
    height: 485
  },
  media: {
    height: 180
  },
  styleButton: {
    size: "small",
    color: "#6c763e"
  }
};

const developerCards = props => {
  const renderDevelopers = () =>
    Developers.map(developer => {
      return (
        <Grid item>
          <Card className={props.classes.card}>
            <CardActionArea>
              <CardMedia
                className={props.classes.media}
                image={developer.imageURL}
                title="Developer"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {developer.name}
                </Typography>
                <Typography component="p">{developer.about}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                className={styles.styleButton}
                size="small"
                color="#6c763e"
                href={developer.portfolioURL}
              >
                Learn More About {developer.firstName} Here!
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });

  return renderDevelopers();
};

export default withStyles(styles)(developerCards);
