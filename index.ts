import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// Get a single task
app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  console.log({ id });

  const task = await prisma.task.findUnique({ where: { id: Number(id) } });
  res.json(task);
});

// Create a new task
app.post("/tasks", async (req, res) => {
  const { title, color } = req.body;
  const newTask = await prisma.task.create({ data: { title, color } });
  res.json(newTask);
});

// Update a task
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;
  const updatedTask = await prisma.task.update({
    where: { id: Number(id) },
    data: { title, color, completed },
  });
  res.json(updatedTask);
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id: Number(id) } });
  res.status(204).send();
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
