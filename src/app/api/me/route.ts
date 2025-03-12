import { auth } from "@/auth";
import { getUserByUsername } from "@/service/sanity/user";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const user = session?.user;

  if(!user) {
    return new Response('Authentication Error', {status: 401})
  }
  return getUserByUsername(user.username).then(res =>NextResponse.json(res))
}