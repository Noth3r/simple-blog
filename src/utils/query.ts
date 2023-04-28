import { Comment, Post } from '@/types/post';
import api from './axios';
import { User } from '@/types/user';

export const getPostsList = async (id: number) => {
  const { data } = await api.get<Post[]>(`/posts?page=${id}`);

  return data;
};

export const getPost = async (id: number) => {
  const { data } = await api.get<Post>(`/posts/${id}`);

  return data;
};

export const getComment = async (id: number) => {
  const { data } = await api.get<Comment>(`/posts/${id}/comments`);

  return data;
};

type PostComment = {
  body: string;
} & Partial<User>;

export const postComment = async (id: number, comment: PostComment) => {
  const { data } = await api.post<Comment>(`/posts/${id}/comments`, {
    name: comment.name,
    email: comment.email,
    body: comment.body,
  });

  return data;
};

export const createUser = async ({ email, name, gender, status }: User) => {
  const { data } = await api.post<User>('/users', {
    email,
    name,
    gender,
    status,
  });

  return data;
};

export const getUsers = async () => {
  const { data } = await api.get<User[]>('/users?page=1&per_page=100');

  return data;
};

export const deleteUser = async (id: number) => {
  const { data } = await api.delete(`/users/${id}`);

  return data;
};

export const loginUser = async (email: string, id: number) => {
  const { data } = await api.get<User>(`/users/${id}`);

  if (data.email != email) {
    return null;
  }

  return data;
};

export const updateUser = async (user: User) => {
  const { data } = await api.put<User>(`/users/${user.id}`, user);

  return data;
};
