import { auth } from '@/auth';
import {  getPostDetail } from '@/service/sanity/post';
import { NextRequest, NextResponse } from 'next/server';
type Context = {
  params: { id: string };
};
export async function GET(req: NextRequest, context: Context) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getPostDetail(context.params.id) //
    .then((res) => NextResponse.json(res));
}
