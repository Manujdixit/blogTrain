import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@manujdixit/blogtrain-common";

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
    c.status(403);
    return c.json({ message: "You are not logged in" });
  }
});

//create blog
blogRouter.post("/create", async (c) => {
  const body = await c.req.json();

  const { success } = createPostInput.safeParse(body);
  if (!success) return c.json({ message: "Invalid input" }, 400);

  const authorId = Number(c.get("userId"));

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId,
        published: body.published,
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

  const { success } = updatePostInput.safeParse(body);
  if (!success) return c.json({ message: "Invalid input" }, 400);

  const id = Number(c.req.param("id"));
  const authorId = Number(c.get("userId"));

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        authorId,
        published: body.published,
      },
    });

    return c.json(blog);
  } catch (error) {
    return c.json({ " error": error }, 500);
  }
});

// get blog
blogRouter.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            profilePic: true,
            about: true,
          },
        },
      },
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

//get all bulk blog
blogRouter.get("/bulk", async (c) => {
  let page = 1;
  let limit = 10;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    page = Number(c.req.query("page") || 1);
    limit = Number(c.req.query("limit") || 10);
    const skip = (page - 1) * limit;

    const total = await prisma.blog.count({
      where: { published: true },
    });
    const totalPages = Math.ceil(total / limit);

    const blog = await prisma.blog.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            profilePic: true,
            about: true,
          },
        },
      },
      skip,
      take: limit,
    });

    return c.json({
      blog,
      pagination: {
        currentPage: page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    return c.json({ error }, 500);
  }
});

//get bulk of a users draft blog
blogRouter.get("/drafts", async (c) => {
  const authorId = c.get("userId");
  let page = 1;
  let limit = 10;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    page = Number(c.req.query("page") || 1);
    limit = Number(c.req.query("limit") || 10);
    const skip = (page - 1) * limit;
    const blogs = await prisma.user.findMany({
      where: { id: Number(authorId) },
      include: {
        blogs: {
          where: { published: false },
          select: {
            id: true,
            title: true,
            content: true,
            datetime: true,
          },
          skip,
          take: limit,
        },
      },
    });

    const total = await prisma.blog.count({
      where: { published: false },
    });

    const totalPages = Math.ceil(total / limit);

    return c.json({
      data: blogs,
      pagination: {
        currentPage: page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    return c.json({ error }, 500);
  }
});

//get bulk of a users published blog
blogRouter.get("/:id/blogs", async (c) => {
  const authorId = c.get("userId");
  let page = 1;
  let limit = 10;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    page = Number(c.req.query("page") || 1);
    limit = Number(c.req.query("limit") || 10);
    const skip = (page - 1) * limit;
    const blogs = await prisma.user.findMany({
      where: { id: Number(authorId) },
      include: {
        blogs: {
          where: { published: true },
          select: {
            id: true,
            title: true,
            content: true,
            datetime: true,
          },
          skip,
          take: limit,
        },
      },
    });

    const total = await prisma.blog.count({
      where: { published: true },
    });

    const totalPages = Math.ceil(total / limit);

    return c.json({
      data: blogs,
      pagination: {
        currentPage: page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    return c.json({ error }, 500);
  }
});
