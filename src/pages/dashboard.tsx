import EditProfile from '@/components/dashboard/EditProfile';
import Layout from '@/components/layouts/Layout';
import useAuth from '@/hooks/useAuth';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  const auth = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!auth?.data?.isLogin) {
      router.push('/');
    }
  }, [auth, router]);

  return (
    <Layout>
      <div className="max-w-7xl mx-5 xl:mx-auto">
        <h1 className="text-center text-2xl mt-12">
          Welcome <span className="font-bold">{auth?.data?.name}</span>
        </h1>
        <EditProfile />
      </div>
    </Layout>
  );
}
