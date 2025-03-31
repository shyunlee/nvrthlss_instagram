import UserSearch from "@/components/UserSearch";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Search',
  description: 'Search user to follow'
}

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return <UserSearch />
   
};