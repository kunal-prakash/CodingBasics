import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.all("/", (req, res) => {
  res.send("I'm up");
});

const todos = [
  {
    id: 1,
    name: "todo1",
    completed: false,
  },
  {
    id: 2,
    name: "todo2",
    completed: true,
  },
];

//Read
app.get("/todos", (req, res) => {
  res.json(todos);
});

//Create
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.json({
    message: "todo added",
  });
});

//Update
app.put("/todos/:id", (req, res) => {
  const todoData = req.body;
  const todoReqId = req.params.id;
  const todoIndex = todos.findIndex((td) => td.id == todoReqId);
  if (todoIndex !== -1) {
    todos[todoIndex] = {
      ...todos[todoIndex],
      ...todoData,
    };
    console.log(todos);
    res.json("Data updated successfully");
  } else {
    res.json("Unable to udpate data");
  }
});

//Delete
app.delete("/todos/:id", (req, res) => {
  const todoReqId = req.params.id;
  const todoIndex = todos.findIndex((td) => td.id == todoReqId);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    console.log(todos);
    res.json("Data deleted successfully");
  } else {
    res.json("Unable to delete data");
  }
});

const PORT = 5111;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
