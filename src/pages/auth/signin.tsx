import Layout from '@/components/layouts/Layout';
import useAuth from '@/hooks/useAuth';
import { User } from '@/types/user';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function Signin() {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const submitHandler = handleSubmit(async (data) => {
    const res = auth?.signin(data.email, data.id!);

    if (!res) return;
  });

  if (auth?.data?.isLogin) {
    return window.location.replace('/');
  }

  return (
    <Layout>
      <div className="w-1/2 flex flex-col mx-auto border-2 mt-12 rounded-xl py-6 px-6">
        <h1 className="mx-auto text-2xl font-bold">Sign In</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-3 mt-2">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              className="border rounded px-2 py-1 mt-1"
              {...register('email')}
              type="email"
              placeholder="johndoe@mail.com"
            />
          </div>
          <div className="flex flex-col">
            <label>Password/ID</label>
            <input
              className="border rounded px-2 py-1 mt-1"
              {...register('id')}
              type="password"
              placeholder="xxxxxx"
            />
          </div>
          <div className="flex text-sm gap-1">
            <p className="text-sm">Don&apos;t have an account?</p>
            <Link href="/auth/signup">Sign Up</Link>
          </div>
          <button
            type="submit"
            className="cursor-pointer mx-auto bg-blue-600 hover:bg-blue-600/90 text-white px-4 py-2 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
}
