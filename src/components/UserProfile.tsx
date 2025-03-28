import { ProfileUser } from '@/model/user';
import Avatar from './Avatar';
import FollowButton from './ui/FollowButton';

type UserProfileProps = {
  user: ProfileUser;
};

export default function UserProfile({ user }: UserProfileProps) {
  const { image, username, name, following, followers, posts } = user;

  const info = [
    { title: 'posts', data: posts },
    { title: 'followers', data: followers },
    { title: 'following', data: following },
  ];

  return (
    <section className='w-full flex flex-col md:flex-row items-center justify-center py-12 border-b border-neutral-300'>
      <Avatar image={image} highlight size='xlarge' />
      <div className='md:ml-10 basis-1/3'>
        <div className='flex flex-col items-center md:flex-row'>
          <h1 className='text-2xl md:mr-8 my-2 md:mb-0'>{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className='flex gap-4 my-4'>
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span className='font-bold mr-1'>{data}</span>
              <span>{title}</span>
            </li>
          ))}
        </ul>
        <p className='text-xl font-bold text-center md:text-start'>{username}</p>
      </div>
    </section>
  );
}
