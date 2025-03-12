import { auth } from "@/auth";
import { getFollowingPostsOf } from "@/service/sanity/post";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getFollowingPostsOf(user.username).then(res =>NextResponse.json(res))
}
