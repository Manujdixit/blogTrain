import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const bulkRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: { userId: string };
}>();

//middleware- check auth and userid
bulkRouter.use("/*", async (c, next) => {
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

//get all bulk blogs
bulkRouter.get("/bulk", async (c) => {
  // let page = 1;
  // let limit = 10;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // page = Number(c.req.query("page") || 1);
    // limit = Number(c.req.query("limit") || 10);
    // const skip = (page - 1) * limit;

    const total = await prisma.blog.count({
      where: { published: true },
    });
    // let totalPages = Math.ceil(total / limit);

    // if (totalPages == 0) totalPages = 1;

    const bulk = await prisma.blog.findMany({
      // where: { id },
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
      // skip,
      // take: limit,
    });

    return c.json({
      bulk,
      // pagination: {
      //   currentPage: page,
      //   limit,
      //   totalPages,
      //   total,
      // },
    });
  } catch (error) {
    return c.json({ error }, 500);
  }
});
