import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: { userId: string };
}>();

//middleware- check auth and userid
blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  if (!authHeader) {
    c.status(401);
    return c.json({ message: "Authorization header is missing" });
  }
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    const userId = user.id;
    if (user) {
      c.set("userId", userId as string);
      await next();
    } else {
      c.status(403);
      return c.json({ message: "Invalid token, access denied" });
    }
  } catch (error) {
    console.error("Error during authorization:", error);
    c.status(403);
    return c.json({ message: "You are not logged in" });
  }
});

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  if (!authHeader) {
    c.status(401);
    return c.json({ message: "Authorization header is missing" });
  }
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    const userId = user.id;
    if (user) {
      c.set("userId", userId as string);
      await next();
    } else {
      c.status(403);
      return c.json({ message: "Invalid token, access denied" });
    }
  } catch (error) {
    console.error("Error during authorization:", error);
    c.status(403);
    return c.json({ message: "You are not logged in" });
  }
});

//create blog
blogRouter.post("/create", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: 1,
      },
    });

    return c.json(blog);
  } catch (error) {
    return c.json({ error }, 500);
  }
});

//update blog
blogRouter.put("/:id", async (c) => {
  const body = await c.req.json();
  const id = Number(c.req.param("id"));
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        authorId: 1,
      },
    });

    return c.json(blog);
  } catch (error) {
    return c.json({ error }, 500);
  }
});

//get blog
blogRouter.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: { id },
    });

    return c.json(blog);
  } catch (error) {
    return c.json({ error }, 500);
  }
});

//delete blog
blogRouter.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.delete({
      where: { id },
    });

    return c.json(blog.id);
  } catch (error) {
    return c.json({ error }, 500);
  }
});

//get bulk all blog
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany();

    return c.json(blogs);
  } catch (error) {
    return c.json({ error }, 500);
  }
});

//get bulk of a user blog
blogRouter.get("/:id/blogs", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.user.findFirst({
      where: { id: Number(id) },
      include: { blogs: true },
    });
    return c.json(blogs);
  } catch (error) {
    return c.json({ error }, 500);
  }
});
