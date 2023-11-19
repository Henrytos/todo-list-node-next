const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const checklistRouter = require("./src/routes/checklist");
const taskRouter = require("./src/routes/task");

require("./config/database");

app.use(express.json());
app.use(cors());

app.use("/checklists", checklistRouter);
app.use("/checklist/task", taskRouter);

app.listen(port, () => {
  console.log(`start server port : ${port}`);
});
