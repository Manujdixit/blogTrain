import { verify } from "hono/jwt";
import { createMiddleware } from "hono/factory";

const authMiddleware = createMiddleware(async (c, next) => {
  const authHeader = c.req.header("authorization") || "";

  if (!authHeader) {
    c.status(401);
    return c.json({ message: "Authorization header is missing" });
  }

  try {
    const user = await verify(authHeader, c.env.JWT_SECRET); // Replace with your JWT verification logic

    if (!user) {
      c.status(403);
      return c.json({ message: "Invalid token, access denied" });
    }

    // Authentication successful, attach a flag to the context
    c.set("isAuthenticated", true); // Or a more descriptive flag
    await next();
  } catch (error) {
    console.error("Error during authorization:", error);
    c.status(403);
    return c.json({ message: "You are not logged in" });
  }
});
