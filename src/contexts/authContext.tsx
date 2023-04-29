/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useCallback, useEffect } from 'react';
import { Auth, AuthContextType } from '@/types/auth';
import { User } from '@/types/user';
import { createUser, loginUser, updateUser } from '@/utils/query';

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth>();
  const [error, setError] = useState<string>();

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

    if (res.status !== 200) {
      setError(res.data.map((e) => e.field + ' ' + e.message).join(', '));
      setTimeout(() => setError(''), 3000);
      return;
    }

    localStorage.setItem('token', JSON.stringify(res.data));
    setAuth({ isLogin: true, ...res.data });
    return res;
  };

  const signin = async (email: string, id: number) => {
    const res = await loginUser(email, id!);

    if (!res) return;

    if (res.status !== 200) {
      setError(res.data.map((e) => e.message).join(', '));
      setTimeout(() => setError(''), 3000);
      return;
    }

    localStorage.setItem('token', JSON.stringify(res.data));
    setAuth({ isLogin: true, ...res.data });
    return res;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ isLogin: false });
  };

  const update = async (data: User) => {
    const res = await updateUser(data);

    if (!res) return;

    if (res.status !== 200) {
      setError(res.data.map((e) => e.field + ' ' + e.message).join(', '));
      setTimeout(() => setError(''), 3000);
      return;
    }

    localStorage.setItem('token', JSON.stringify(res.data));
    setAuth({ isLogin: true, ...res.data });
  };

  return (
    <AuthContext.Provider
      value={{ data: auth, signin, signup, logout, updateUser: update, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthProvider;
