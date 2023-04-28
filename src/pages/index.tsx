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

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return (
      <Layout>
        <main>Loading...</main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main>
        {data?.map((items) => (
          <div key={items.id}>
            <Link href={`/post/${items.id}`}>
              <h1>{items.title}</h1>
            </Link>
          </div>
        ))}
        <div>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <span>{page}</span>
          <button
            onClick={() => {
              if (!data || data.length < 10) return;
              setPage((old) => old + 1);
            }}
            disabled={!data || data.length < 10}
          >
            Next Page
          </button>
        </div>
      </main>
    </Layout>
  );
}
