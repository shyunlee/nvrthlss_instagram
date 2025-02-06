'use client';

import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { signIn } from 'next-auth/react'

import ColorButton from './ui/ColorButton';

type SigninProps = {
  providers: { id: string; name: string }[];
  callbackUrl: string;
};

const SIGNIN_ERROR_URL = 'localhost:3000';

export default function SignIn({ providers, callbackUrl }: SigninProps) {
  const onLogin = async (id: string) => {
    try {
      await signIn(id, {
        redirectTo: callbackUrl,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
      }
      throw error;
    }
  }

  return (
    <div className='flex flex-col items-center mt-[20%]'>
      {/* <form
        action={(formData) => {
          try {
            signIn('credentials', formData);
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
            }
            throw error;
          }
        }}
        className='flex flex-col gap-4 m-2 justify-center'
      >
        <label htmlFor='email'>
          Email
          <input name='email' id='email' />
        </label>
        <label htmlFor='password'>
          Password
          <input name='password' id='password' />
        </label>
        <input type='submit' value='Sign In' />
      </form> */}
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <ColorButton text={`Sign In with ${provider.name}`} onClick={() => onLogin(provider.id)} />
        </div>
      ))}
    </div>
  );
}
