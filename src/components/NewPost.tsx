'use client';

import { AuthUser } from '@/model/user';
import PostUserAvatar from './PostUserAvatar';
import FilesIcon from './ui/icons/FilesIcon';
import Button from './ui/Button';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GridSpinner from './ui/GridSpinner';

type NewPostProps = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: NewPostProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    if (e.type === 'dragenter') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file)
    formData.append('text', textRef.current?.value ?? '')

    fetch('/api/posts', {
      method: 'POST',
      body: formData
    }).then((res) => {
      if (!res.ok) {
        setError(`${res.status} ${res.statusText}`)
        return;
      }
      router.push(`/user/${username}`)
    })
    .catch((err) => setError(err.toString()))
    .finally(() => setIsLoading(false));
  }

  return (
    <section className='w-full max-w-xl flex flex-col items-center m-6'>
      {isLoading && (
        <div className='absolute inset-0 z-20 bg-neutral-900/70 text-center pt-[20%]'>
          <GridSpinner color={'skyblue'}/>
        </div>
      )}
      {error && (
        <p className='w-full bg-red-100 p-3 font-bold mb-4 text-center text-red-600'>
          {error}
        </p>
      )}
      <PostUserAvatar username={username} userImage={image ?? ''} />
      <form className='w-full flex flex-col mt-2' onSubmit={handleSubmit}>
        <input
          className='hidden'
          name='input'
          id='input-upload'
          type='file'
          accept='image/*'
          onChange={handleChange}
        />
        <label
          htmlFor='input-upload'
          className={`relative w-full flex flex-col items-center justify-center h-72 ${!file && 'border-2 border-sky-500 border-dashed'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {isDragging && (
            <div className='absolute inset-0 z-10 bg-sky-500/20 pointer-events-none' />
          )}
          {!file && (
            <div className='flex flex-col items-center pointer-events-none'>
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
          {file && (
              <Image
                className='object-cover'
                src={URL.createObjectURL(file)}
                alt='local file'
                fill
                sizes='650px'
              />
          )}
        </label>
        <textarea
          className='outline-none p-2'
          name='text'
          id='input-text'
          required
          rows={10}
          placeholder='Write a caption...'
          ref={textRef}
        />
        <Button text='Publish' onClick={() => {}} />
      </form>
    </section>
  );
}
