"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });


  // First, ensure the author exists
  const authorId = session?.user?.id;
  if (!authorId) {
    throw new Error("No user ID found in session");
  }

  // Convert authorId to a number, handling potential non-numeric characters
  const numericId = parseInt(authorId.replace(/[^0-9]/g, '')) || 0;

  // Create or update the author document
  const authorDoc = {
    _type: "author",
    _id: authorId,
    id: numericId,
    name: session?.user?.name || "Anonymous",
    username: session?.user?.name?.toLowerCase().replace(/\s+/g, "_"),
    email: session?.user?.email,
    bio: "No bio provided",
    image: session?.user?.image,
  };

  // Try to create the author first
  try {
    await writeClient.createIfNotExists(authorDoc);
  } catch (error) {
    console.error("Error creating author:", error);
  }

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.user?.id,
      },
      pitch,
    };

    
  

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};