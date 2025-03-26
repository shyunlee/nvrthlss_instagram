import { SearchResultUser } from '@/model/user';
import { client } from './sanity';

type OAuthUserType = {
  id: string;
  name: string;
  email: string;
  username: string;
  image?: string;
};

export async function addNewUser({
  id,
  email,
  name,
  image,
  username,
}: OAuthUserType) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    email,
    name: name,
    username,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id":_id,
      following[]->{username, image},
      followers[]->{username, image},
      "bookmarks":bookmarks[]->_id
    }`
  );
}

export async function searchUsers(keyword?: string) {
  console.log(keyword);
  const query = keyword
    ? `&& (name match "${keyword}") || (username match "${keyword}")`
    : '';
  return client
    .fetch(
      `*[_type == "user" ${query}]{
    ...,
    "following": count(following),
    "followers": count(followers)
    }
    `
    )
    .then((users) =>
      users.map((user: SearchResultUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}
