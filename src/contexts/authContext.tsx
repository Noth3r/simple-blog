/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useCallback, useEffect } from 'react';
import { Auth, AuthContextType } from '@/types/auth';
import { User } from '@/types/user';
import { createUser, loginUser, updateUser } from '@/utils/query';

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth>();

  useEffect(() => {
    setAuth(callback());
  }, []);

  const callback = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const data = JSON.parse(token) as User;
      if (data.email) return { isLogin: true, ...data };
    }
    return { isLogin: false };
  }, []);

  const signup = async (data: User) => {
    const res = await createUser(data);

    if (!res) return;

    localStorage.setItem('token', JSON.stringify(res));
    setAuth({ isLogin: true, ...res });
    return res;
  };

  const signin = async (email: string, id: number) => {
    const res = await loginUser(email, id!);

    if (!res) return;

    localStorage.setItem('token', JSON.stringify(res));
    setAuth({ isLogin: true, ...res });
    return res;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ isLogin: false });
  };

  const update = async (data: User) => {
    const res = await updateUser(data);

    console.log(res);

    localStorage.setItem('token', JSON.stringify(res));
    setAuth({ isLogin: true, ...res });
  };

  return (
    <AuthContext.Provider
      value={{ data: auth, signin, signup, logout, updateUser: update }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthProvider;
