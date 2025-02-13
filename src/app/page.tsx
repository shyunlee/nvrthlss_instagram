import FollowingBar from "@/components/FollowingBar";
import PostsList from "@/components/PostsList";
import SideBar from "@/components/SideBar";
import { auth } from '@/auth';
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <section className='w-full flex flex-col md:flex-row max-w-[850px] p-4'>
      <div className='w-full basis-3/4'>
        <FollowingBar />
        <PostsList />
      </div>
      <div className='w-full basis-1/4'>
        <SideBar user={user}/>
      </div>
    </section>
  );
}
