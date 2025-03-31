import { redirect } from 'next/navigation';
import { auth, providerMap } from '@/auth';
import SignIn from '@/components/Signin';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Signup or login to Instagram'
}

type SignInProps = {
  searchParams: Promise<{
    callbackUrl: string | undefined;
  }>
};

export default async function SignInPage(props: SignInProps) {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <section className='flex justify-center mt-24'>
       <SignIn providers={providerMap} callbackUrl={callbackUrl ?? '/'}/>
    </section>
  )
  
}
