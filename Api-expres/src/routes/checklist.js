const express = require("express");
const router = express.Router();
const Checklist = require("../models/checklist");

router.get("/", async (req, res) => {
  try {
    let checklists = await Checklist.find();
    res.status(200).json(checklists);
  } catch (error) {}
});

router.get("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).json(checklist);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let { name } = req.body;
    let checklist = await Checklist.create({ name });
    res.status(200).json(checklist);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const checklist = await Checklist.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.status(200).json(checklist);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});
router.delete("/", async (req, res) => {
  try {
    let checklists = await Checklist.deleteMany();
    res.status(200).json(checklists);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndDelete(req.params.id);
    if (!checklist) {
      return res.status(404).json({ message: "Checklist not found" });
    }
    res.status(200).json(checklist);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

module.exports = router;
