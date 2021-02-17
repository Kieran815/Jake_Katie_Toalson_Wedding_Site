// reducers are functions that accept `state` and `action`
// they can be passed to redux to help handle api requests
// *** make sure to set initial `state` value as `[]`
// can be written as `if-else`, but waaay easier to do as `switch`
// if (action.type === "CREATE") {
//   // one `if/else` for each `action.type`
// }
// or use a `switch`:

// import actionTypes to help with error-checking
// catch spelling errors and scale up more easily
// see `../actions/posts.js` for more
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

// payload passed from  "../actions/posts"
export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
