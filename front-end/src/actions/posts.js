// import action types to help with error checking;
// actions types help to catch spelling errors when working with actions;
// action types also make apps more scalable
// passing action variable assigned to strings will throw errors if mis-spelled
// these variables are also passed to the `reducers` file
// called in the `switch` statement
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";
import * as api from "../api/index";

// Action Creators:
// functions that return actions
// actions have `type` and a `payload` props
// `thunk` uses async function to dispatch result of calling the action

// const getPosts = () => async (dispatch) => {
//   const action = {
//     type: "FETCH_ALL",
//     payload: [],
//   };
//   dispatch(action);
// };

export const getPosts = () => async (dispatch) => {
  try {
    // use api call to get data object
    const { data } = await api.fetchPosts();
    // de-structured from dispatch
    dispatch({
      type: FETCH_ALL,
      // payload can be passed directly to reducer @ "../reducers/posts"
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    // await updated `res.data` and re-render
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    // await updated `res.data` and re-render
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
