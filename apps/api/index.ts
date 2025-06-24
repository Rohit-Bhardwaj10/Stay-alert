import express from "express";
import cors from "cors";
import { prisma } from "db/client";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(ClerkExpressRequireAuth());

app.post("/api/v1/website", async (req, res) => {
  const userId = req.userId!;
  const { url } = req.body;
  const data = await prisma.website.create({
    data: {
      userId,
      url,
    },
  });
  res.json({
    id: data.id,
  });
});

app.get("/api/v1/website/status", async (req, res) => {
  const websiteId = req.query.websiteId as string;
  const userId = req.userId!;

  const data = await prisma.website.findFirst({
    where: {
      id: websiteId,
      userId,
      disabled: false,
    },
    include: {
      ticks: true,
    },
  });
  res.json(data);
});

app.get("/api/v1/websites", async (req, res) => {
  const userId = req.userId!;
  const data = await prisma.website.findMany({
    where: {
      userId,
      disabled: false,
    },
    include: {
      ticks: true,
    },
  });
  res.json({ websites: data });
});

app.delete("/api/v1/website/:id", async (req, res) => {
  const userId = req.userId!;
  const websiteId = req.params.id;
  await prisma.website.update({
    where: {
      id: websiteId,
      userId,
    },
    data: {
      disabled: true,
    },
  });
  res.json({ message: "Website deleted successfully" });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
