import express, { Request, Response } from "express";
import prisma from "./database";

const app = express();

app.use("/", async (req: Request, res: Response) => {
  const messages = await prisma.message.findMany();
  if (messages.length === 0) return res.send("There are no messages!");
  return res.send(messages);
});

export default app;