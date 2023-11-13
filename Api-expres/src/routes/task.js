const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const Checklist = require("../models/checklist");

router.get("/", async (req, res) => {
  try {
    let tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: "Task not found" });
  }
});

router.put("/rename/:id", async (req, res) => {
  let { name } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  let { done } = req.body;
  try {
    let task = await Task.findByIdAndUpdate(
      req.params.id,
      { done },
      { new: true }
    );
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

router.post("/:id", async (req, res) => {
  let { name } = req.body;

  try {
    let checklist = await Checklist.findById(req.params.id);
    let task = await Task.create({
      checklistName: checklist.name,
      name,
      checklist: req.params.id,
    });
    await task.save();
    checklist.tasks.push(task);
    checklist.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

router.delete("/", async (req, res) => {
  let { idChecklist } = req.body;
  try {
    let tasks = await Task.deleteMany({ checklist: idChecklist });
    let checklist = await Checklist.findById(idChecklist);
    checklist.tasks = [];
    checklist.save();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  let task = await Task.findByIdAndDelete(req.params.id);
  let checklist = await Checklist.findById(task.checklist);
  try {
    let taskToRemove = checklist.tasks.indexOf(task._id);
    console.log(taskToRemove);
    checklist.tasks.splice(taskToRemove, 1);
    checklist.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

module.exports = router;
