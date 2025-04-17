import { auth } from '@/auth';
import NewPost from '@/components/NewPost';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'New Post',
  description: 'Create a new post',
};

export default async function AddNewPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
      <NewPost user={user} />
  );
}
