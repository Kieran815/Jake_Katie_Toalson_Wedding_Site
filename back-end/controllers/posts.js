import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

/*
  **** Creating Handlers for Routes ****

  Best Practice for Scalability:
  use controllers to handle all of the logic for what gets served up to route requests. This keeps the `index.js` file from becoming too bloated/unreadable, and makes updating content easier
*/

// if only one method, use export default;
// if more than one method, start function declaration with `export`
// this method is exported to `../Routes/posts.js`

{
  /* ***************** GET ALL POSTS ***************** */
}
// use `async/await` for any callback that takes time to complete
export const getPosts = async (req, res) => {
  try {
    // `find` all data from collection
    const postMessages = await PostMessage.find();
    console.log(postMessages);
    // send `OK` status (200), and return data (JSON format)
    res.status(200).json(postMessages);
  } catch (error) {
    // send `error` status (404) and return error message
    res.status(404).json({ message: error.message });
  }
};

{
  /* ***************** CREATE POSTS ***************** */
}
export const createPost = async (req, res) => {
  // make a variable to save all of the data from the front-end form, via `req.body`
  const post = req.body;
  // assign data from form to the `req.body` variable
  // `req.body` input compared to imported schema model
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    // if newPost created, send status (201, successful creation)
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

{
  /* ***************** UPDATE POSTS ***************** */
}
export const updatePost = async (req, res) => {
  // `id` is de-structured from `post._id`, added at time of post creation
  // selected `id` is passed from front-end (user selected), then RENAMED AS `_id`
  const { id: _id } = req.params;
  // `body` data to be pulled from the selected document
  // (`_id` document when found)
  const post = req.body;
  // check if `post._id` is valid in db, via Mongoose
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Sorry, Not a Valid Post ID...");
  }
  // call post data model/values from
  const updatedPost = await PostMessage.findByIdAndUpdate(
    // find post by id
    _id,
    //
    // pull data (`body`) from post that matches `_id`
    { ...post, _id },
    // `new` allows db to receive updated post data/body
    {
      new: true,
    }
  );

  // send updated data to db as JSON object
  res.json(updatedPost);
};

{
  /* ***************** DELETE POSTS ***************** */
}
export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Not a Valid Post Id...");
  }

  await PostMessage.findByIdAndRemove(id);
  console.log("deleted");
  res.json({ message: "Post Successfully Deleted" });
};

{
  /* ***************** LIKE POSTS ***************** */
}
export const likePost = async (req, res) => {
  // destructure id value from req
  const { id } = req.params;

  // check if id is valid request
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Not a Valid Post Id...");
  }

  // locate validated post by id
  const post = await PostMessage.findById(id);

  // increase like count of validated post
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  // send updated post data to server
  res.json(updatedPost);
};
