import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import playlist from "./images/playlist.png";
import Posts from "./components/posts/Posts";
import Form from "./components/form/Form";
import useStyles from "./styles";

const App = () => {
  // state hook, see about taking out after updating Redux
  const [currentId, setCurrentId] = useState(0);

  // call classes from useStyles
  const classes = useStyles();

  // redux dispatch
  const dispatch = useDispatch();

  // re-render on `currentId` change and dispatch method
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container max-width="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={playlist}
          alt="memories"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            className={classes.mainContainer}
            justify="space-between"
            align-items="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
