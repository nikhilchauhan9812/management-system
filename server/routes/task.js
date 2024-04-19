const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Task = mongoose.model("Task");
const requirelogin = require("../middleware/requirelogin");

router.get("/alltask", requirelogin, (req, res) => {
  Task.find()
    .populate("postedby", "_id name")
    .populate("assignedTo", "name") // Populate assignedTo field with user's name
    .then((tasks) => {
      res.json({ tasks });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.get('/assignedtask',requirelogin,(req,res)=>{
  Task.find({assignedTo:req.user._id})
  .populate("postedby", "_id name")
  .populate("assignedTo", "name")
  .then(assignedtask=>{
    res.json({assignedtask})
  }).catch(err=>console.log(err))
  
})

router.get("/mytask", requirelogin, (req, res) => {
  Task.find({ postedby: req.user._id })
  .populate("postedby", "_id name")
  .populate("assignedTo", "name")
   .then((mytask) => {
      res.json({ mytask });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/createtask", requirelogin, async (req, res) => {
  const { title, body, assignedTo } = req.body;

  if (!title || !body || !assignedTo) {
    return res.status(422).json({ error: "Please provide all the required fields" });
  }


    // Check if the assignedTo user exists
    const assignedUser = await User.findOne({ name: assignedTo });;
    if (!assignedUser) {
      return res.status(404).json({ error: "User not found. Task cannot be assigned." });
    }

    // Create the task
    const task = new Task({
      title,
      body,
      assignedTo: assignedUser, // Assign the user object
      postedby: req.user,
    });

    // Save the task to the database
     task.save().then((savedTask) => {
      return Task.findById(savedTask._id)
      .populate("assignedTo", "name _id")
      .populate("postedby", "name _id")
     }).then((savedTask) => {
      res.json({ task: savedTask });
     })
     .catch( (err)=> {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  })
})


router.patch("/updatetask/:taskid", requirelogin, (req, res) => {
  const { taskid } = req.params;
  Task.findById(taskid).then((task) => {
    if (!task) {
      return res.json({ error: "task not found" });
    }

    if (task.postedby._id.toString() !== req.user._id.toString()) {
      return res.json({ error: "You are not authorised to update this task" });
    } 


      const { title, body, assignedTo } = req.body;
      const updatedFeilds = {};

      if (title) updatedFeilds.title = title;
      if (body) updatedFeilds.body = body;
      if (assignedTo) updatedFeilds.assignedTo = assignedTo;

      Task.findByIdAndUpdate(taskid, updatedFeilds, { new: true })
        .then((result) => {
          if (!result) {
           return  res.status(422).json("task not found");
          } else {
            res.json({ updatedTask: result });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json("internal server error");
        });
    }
  );
});

router.delete("/deletetask/:taskid", requirelogin, (req, res) => {
  const { taskid } = req.params;
  Task.findById(taskid).then((task) => {
    if (!task) {
      return res.json({ error: "task not found" });
    }

    if (task.postedby._id.toString() !== req.user._id.toString()) {
      return res.json({ error: "You are not authorised to delete this task" });
    } else {
      Task.findByIdAndDelete(taskid, { new: true })
        .then((result) => {
          if (!result) {
            res.json({ message: "task not found" });
          } else {
            res.json({ message: "task deleted successfully" });
          }
        })

        .catch((err) => {
          console.log(err);
          res.json({ error: "error occured task not deleted" });
        });
    }
  });
});

module.exports = router;
