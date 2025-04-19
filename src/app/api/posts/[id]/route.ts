import { getPostDetail } from '@/service/sanity/post';
import { withSessionUser } from '@/util/session';
import { NextRequest, NextResponse } from 'next/server';
type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, context: Context) {
  return withSessionUser(async (user) => {
    const { id } = await context.params;

    return getPostDetail(id) //
      .then((res) => NextResponse.json(res));
  });
}
