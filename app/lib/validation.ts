import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url("Please enter a valid URL")
    .refine(
      async (url) => {
        try {
          const res = await fetch(url, { method: "HEAD" });
          const contentType = res.headers.get("content-type");
          return contentType?.startsWith("image/");
        } catch {
          return false;
        }
      },
      {
        message: "The URL must point to a valid image file (jpg, png, gif, etc.)",
      }
    ),
  pitch: z.string().min(10),
});