import { verify } from "hono/jwt";
import { createMiddleware } from "hono/factory";

const authMiddleware = createMiddleware(async (c, next) => {
  if (!c.get("isAuthenticated")) {
    // Check if authentication was successful in previous middleware
    return c.json({ message: "Unauthorized" },403);
  }

  try {
    // Extract the user ID from the previously verified user object (replace with your logic)
    const userId = c.user.id; // Assuming the user object is attached to the context in your verification logic
    c.set("userId", userId as string);
    await next();
  } catch (error) {
    console.error("Error extracting user ID:", error);
    next(error); // Pass the error to the error handler middleware
  }
}
