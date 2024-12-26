import cluster from "cluster";
import os, { cpus } from "os";

import express from "express";
import connectDB from "./utils/database.js";

import Mainroutes from "./ROUTER/mainRoutes.js";
import enrolledCourse from "./ROUTER/enrolledCourses.js";

const numCpus = cpus().length;

if (cluster.isMaster) {

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    cluster.fork()
  });
} else {

  const app = express();

  app.use("/", Mainroutes);
  app.use("/api/enrolled", enrolledCourse);

  app.use((req, res, next) => {
    console.log("Backend nahi chal raha bhai");
    res.status(404).send("Route not found");
  });

  const PORT = 5001;
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });

  connectDB();
}