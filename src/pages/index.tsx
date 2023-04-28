import { useQuery } from '@tanstack/react-query';
import { getPostsList } from '@/utils/query';
import { useState } from 'react';
import Layout from '@/components/layouts/Layout';
import Link from 'next/link';
import ButtonPost from '@/components/post/ButtonPosts';

export default function Home() {
  const [page, setPage] = useState(1);

  const { isLoading, data } = useQuery(
    ['posts', page],
    () => getPostsList(page),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto mt-12">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-12">
        <h1 className="text-4xl text-center mb-8 font-bold">GoRest Blog</h1>
        {data?.map((items) => (
          <Link key={items.id} href={`/post/${items.id}`}>
            <div className="border-2 rounded-xl px-8 py-4 mb-4">
              <h1 className="text-2xl font-bold">{items.title}</h1>
              <p className="truncate">{items.body}</p>
            </div>
          </Link>
        ))}
        <div className="flex gap-2 justify-center items-center my-8">
          <ButtonPost data={data} setPage={setPage} page={page} next={false} />
          <span className="font-bold text-xl">{page}</span>
          <ButtonPost data={data} setPage={setPage} page={page} next={true} />
        </div>
      </div>
    </Layout>
  );
}
