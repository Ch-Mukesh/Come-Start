"use server";

import { signIn, signOut } from "@/auth";

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}

export async function handleSignIn(formData: FormData) {
  const provider = formData.get("provider") as string;
  await signIn(provider, { 
    redirectTo: "/?status=success",
    redirect: true
  });
}