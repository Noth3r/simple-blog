import { Inter } from 'next/font/google';
import { useQuery } from '@tanstack/react-query';
import { getPostsList } from '@/utils/query';
import { useEffect, useState } from 'react';
import Layout from '@/components/layouts/Layout';
import Link from 'next/link';

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
        {data?.map((items) => (
          <Link key={items.id} href={`/post/${items.id}`}>
            <div className="border-2 rounded-xl px-8 py-4 mb-4">
              <h1 className="text-2xl font-bold">{items.title}</h1>
              <p className="truncate">{items.body}</p>
            </div>
          </Link>
        ))}
        <div className="flex gap-2 justify-center items-center my-8">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            className="w-5 h-5"
            // className="hover:scale-110 transition text-right cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
          <span className="font-bold text-xl">{page}</span>
          <button
            onClick={() => {
              if (!data || data.length < 10) return;
              setPage((old) => old + 1);
            }}
            disabled={!data || data.length < 10}
            className="w-5 h-5"
            // className="hover:scale-110 transition text-left cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </button>
        </div>
      </div>
    </Layout>
  );
}
