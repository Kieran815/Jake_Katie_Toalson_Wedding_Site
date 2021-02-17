/*
 **** Setting Up Routes for Pages
 */
import express from "express";

// method imports
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

// use express.Router()
const router = express.Router();

// `route.get` links a Path ('/') to a function (request(CRUD), response(string, page, json, etc))
/*  Basic example of a get request:
router.get('/', (req, res) => {
  res.send("Working Router")
});
*/
// get all route
router.get("/", getPosts);

// create post route
router.post("/", createPost);

// update post route
// `.patch` used to update existing docs/posts etc.
// `:` means dynamic; below means `whatever doc id is`
router.patch("/:id", updatePost);

// delete post route
router.delete("/:id", deletePost);

// like post route
// `.patch` because updating # of likes
router.patch("/:id/likePost", likePost);

export default router;
