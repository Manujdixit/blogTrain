import z from "zod";

export const signupInput = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});
export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type SigninType = z.infer<typeof signinInput>;

export const createPostInput = z.object({
  title: z.string(),
  summary: z.string(),
  content: z.string(),
});
export type CreatePostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});
export type UpdatePostType = z.infer<typeof updatePostInput>;
