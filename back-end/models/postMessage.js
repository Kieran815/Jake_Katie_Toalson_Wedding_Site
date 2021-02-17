import mongoose from 'mongoose';


// Using Mongoose:
// 1. Create a Schema for your data: gives uniformity to your documents for comsuming data
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

//  2. Take Schema and turn it into a model: consume schema data
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
