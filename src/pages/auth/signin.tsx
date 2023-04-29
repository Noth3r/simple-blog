import Layout from '@/components/layouts/Layout';
import useAuth from '@/hooks/useAuth';
import { User } from '@/types/user';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Signin() {
  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const submitHandler = handleSubmit(async (data) => {
    const res = auth?.signin(data.email, data.id!);

    if (!res) return;
  });

  useEffect(() => {
    if (auth?.data?.isLogin) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Layout>
      <div className="mx-5 xl:w-1/2 flex flex-col xl:mx-auto border-2 mt-12 rounded-xl py-6 px-6">
        <h1 className="mx-auto text-2xl font-bold">Sign In</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-3 mt-2">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              className="border rounded px-2 py-1 mt-1 focus:outline-blue-500"
              {...register('email')}
              type="email"
              placeholder="johndoe@mail.com"
            />
          </div>
          <div className="flex flex-col">
            <label>Password/ID</label>
            <input
              className="border rounded px-2 py-1 mt-1 focus:outline-blue-500"
              {...register('id')}
              type="password"
              placeholder="xxxxxx"
            />
          </div>
          <div className="flex text-sm gap-1">
            <p className="text-sm">Don&apos;t have an account?</p>
            <Link href="/auth/signup" className="font-semibold">
              Sign Up
            </Link>
          </div>
          {auth?.error && (
            <p className="text-red-500 text-sm text-center font-semibold">
              {auth?.error}
            </p>
          )}
          <button
            type="submit"
            className="cursor-pointer mx-auto bg-blue-600 hover:bg-blue-600/90 text-white px-4 py-2 rounded-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </Layout>
  );
}
