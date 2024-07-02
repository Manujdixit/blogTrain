import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
}>();

async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  // Ensure all required fields are present
  const { email, username, password, name } = body;
  if (!email || !username || !password || !name) {
    return c.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Hash the password
  let hashedPassword = await hashPassword(body.password);
  try {
    hashedPassword = await hashPassword(body.password);
  } catch (e) {
    console.error("Error hashing password:", e);
    return c.json({ error: "Failed to hash password" }, { status: 500 });
  }

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    // Log the JWT_SECRET to ensure it's set
    console.log("JWT_SECRET:", c.env.JWT_SECRET);

    // Ensure the JWT_SECRET is a string
    if (typeof c.env.JWT_SECRET !== "string") {
      throw new Error("JWT_SECRET is not a string");
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(jwt);
    // return c.json({ user });
  } catch (error) {
    console.error("Error creating user:", error); // Log the actual error for debugging
    return c.json({ error: "Failed to create user" }, { status: 500 });
  }
});

userRouter.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const hashedPassword = await hashPassword(body.password);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: hashedPassword,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "Invalid user" });
    }
    const isPasswordValid =
      (await hashPassword(body.password)) === user.password;

    if (!isPasswordValid) {
      c.status(403);
      return c.json({ error: "Invalid password" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.text(jwt);
  } catch (error) {
    return c.json({ error: "Failed to sign in" }, { status: 500 });
  }
});
