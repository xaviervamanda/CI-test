import supertest from "supertest";
import app from "../src/app";
import { describe } from "node:test";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.message.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
})

describe("integration test", () => {
  it("should return there are no messages", async () => {
    const { text } = await api.get("/");
    expect(text).toBe("There are no messages!");
  });

  it("should return all messages", async () => {
    await prisma.message.create({ data: { text: "Hello World!" } });

    const { body: messages } = await api.get("/");
    expect(messages).toHaveLength(1);
    expect(messages[0].text).toBe("Hello World!");
  });
})