import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserProfile } from "@/service/sanity/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type UserPageProps = {
  params: Promise<{ username: string }>;
};

const getUser = cache(async (username: string) => getUserProfile(username))

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;
  
  const profileUser = await getUser(username);
  
  if (!profileUser) {
    notFound();
  }
  return (
    <section className='w-full'>
      <UserProfile user={profileUser} />
      <UserPosts user={profileUser} />
    </section>
  );
}

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  const { username } = await params;
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) · Nevertheless Photos`,
    description: `${user?.name}'s all photos` 
  }
}