import { Comment, Post } from '@/types/post';
import api from './axios';
import { User } from '@/types/user';

type Error = {
  message: string;
  field?: string;
};

type PostComment = {
  body: string;
} & Partial<User>;

export const getPostsList = async (id: number) => {
  const { data, status } = await api.get<Post[] & Error[]>(`/posts?page=${id}`);

  return { data, status };
};

export const getPost = async (id: number) => {
  const { data, status } = await api.get<Post & Error[]>(`/posts/${id}`);

  return { data, status };
};

export const getComment = async (id: number) => {
  const { data, status } = await api.get<Comment & Error[]>(
    `/posts/${id}/comments`
  );

  return { data, status };
};

export const postComment = async (id: number, comment: PostComment) => {
  const { data, status } = await api.post<Comment & Error[]>(
    `/posts/${id}/comments`,
    {
      name: comment.name,
      email: comment.email,
      body: comment.body,
    }
  );

  return { data, status };
};

export const createUser = async ({ email, name, gender, status }: User) => {
  const { data, status: statusCode } = await api.post<User & Error[]>(
    '/users',
    {
      email,
      name,
      gender,
      status,
    }
  );

  return { data, status: statusCode };
};

export const getUsers = async () => {
  const { data, status } = await api.get<User[] & Error[]>(
    '/users?page=1&per_page=100'
  );

  return { data, status };
};

export const deleteUser = async (id: number) => {
  const { data, status } = await api.delete(`/users/${id}`);

  return { data, status };
};

export const loginUser = async (email: string, id: number) => {
  const { data, status } = await api.get<User & Error[]>(`/users/${id}`);

  if (data.email != email) {
    return {
      data: [
        {
          message: 'User not found',
        },
      ],
      status: 404,
    };
  }

  return { data, status };
};

export const updateUser = async (user: User) => {
  const { data, status } = await api.put<User & Error[]>(
    `/users/${user.id}`,
    user
  );

  return { data, status };
};
