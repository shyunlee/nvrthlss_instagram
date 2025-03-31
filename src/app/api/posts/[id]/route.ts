import { auth } from '@/auth';
import {  getPostDetail } from '@/service/sanity/post';
import { NextRequest, NextResponse } from 'next/server';
type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, context: Context) {
  const { id } = await context.params;
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getPostDetail(id) //
    .then((res) => NextResponse.json(res));
}
