'use client';

import { AuthUser } from '@/model/user';
import PostUserAvatar from './PostUserAvatar';
import FilesIcon from './ui/icons/FilesIcon';
import Button from './ui/Button';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

type NewPostProps = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: NewPostProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File>();

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
  return (
    <section className='w-full max-w-xl flex flex-col items-center m-6'>
      <PostUserAvatar username={username} userImage={image ?? ''} />
      <form className='w-full flex flex-col mt-2'>
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
        />
        <Button text='Publish' onClick={() => {}} />
      </form>
    </section>
  );
}
