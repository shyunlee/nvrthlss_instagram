import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserProfile } from "@/service/sanity/user";
import { notFound } from "next/navigation";

type UserPageProps = {
  params: { username: string };
};

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;
  
  const profileUser = await getUserProfile(username);
  
  if (!profileUser) {
    notFound();
  }
  return (
    <>
      <UserProfile user={profileUser} />
      <UserPosts user={profileUser} />
    </>
  );
}
