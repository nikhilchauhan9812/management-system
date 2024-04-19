const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  body: {
    type: "string",
    required: true,
  },
 
  postedby: {
    type: ObjectId,
    ref: "User",
  },
  assignedTo: {
    type: [ObjectId], // For multiple user assignment
    ref: 'User' // Reference to the User model
  }
});

mongoose.model("Task", postSchema);
