import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput } from "@manujdixit/blogtrain-common";

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

//user signup
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  // Ensure all required fields are present
  const { email, username, password, name } = body;

  const { success } = signupInput.safeParse(body);
  if (!success) {
    return c.json(
      {
        error: "Inputs not correct",
      },
      400
    );
  }

  //chek if user is already present based on username and email
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  if (existingUser) {
    return c.json(
      { error: "User with this email or username already exists" },
      400
    );
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

//user signin
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);
  if (!success) {
    return c.json(
      {
        error: "Inputs not correct",
      },
      400
    );
  }

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
