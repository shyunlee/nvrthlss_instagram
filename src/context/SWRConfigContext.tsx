'use client';
import { SWRConfig } from 'swr';

type SWRContextProps = {
  children: React.ReactNode;
}
export default function SWRConfigContext({children}: SWRContextProps) {
  return <SWRConfig
    value={{
      fetcher: (url: string) => fetch(url).then((res) => res.json())
    }}
  >{children}</SWRConfig>
}