import { combineReducers } from "redux";

import posts from "./posts";

// this passes `posts` as `state` property to redux
export default combineReducers({ posts });
