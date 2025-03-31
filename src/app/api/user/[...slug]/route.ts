import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from "@/service/sanity/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{slug: string[]}>
}

export async function GET(_:NextRequest, context: Context) {
 const [username, query] = (await context.params).slug;

 if (!username || !query) {
  return new NextResponse('Bad Request', {status: 400})
 }

 let requestQuery = getPostsOf
 if (query === 'likes') {
  requestQuery = getLikedPostsOf
 } else if (query === 'saved') {
  requestQuery = getSavedPostsOf
 }

 return requestQuery(username).then(res => NextResponse.json(res))
}