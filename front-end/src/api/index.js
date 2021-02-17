import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updatedPost) => {
  // pass `url` (inc'l `post.id`) and the updated data (req.body)
  axios.patch(`${url}/${id}`, updatedPost);
};

export const deletePost = (id) => {
  axios.delete(`${url}/${id}`);
};

export const likePost = (id) => {
  axios.patch(`${url}/${id}/likePost`);
};
