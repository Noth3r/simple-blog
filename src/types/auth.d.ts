import { User } from './user';

export type AuthContextType = {
  data: Auth | undefined;
  signup: (data: User) => void;
  updateUser: (data: User) => void;
  signin: (email: string, id: number) => void;
  logout: () => void;
};

export type Auth = {
  isLogin: boolean;
} & Partial<User>;
