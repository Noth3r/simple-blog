import { useQuery } from "@tanstack/react-query";
import { getPostsList } from "@/utils/query";
import { useState } from "react";
import Layout from "@/components/layouts/Layout";
import ButtonPost from "@/components/post/ButtonPosts";
import PostCard from "@/components/post/PostCard";

export default function Home() {
  const [page, setPage] = useState(1);

  const { isLoading, data: queryData } = useQuery(
    ["posts", page],
    () => getPostsList(page),
    { keepPreviousData: true }
  );

  const data = queryData?.data;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-12">
        <h1 className="text-4xl text-center mb-8 font-bold">GoRest Blog</h1>
        {isLoading && <div className="text-center">Loading...</div>}
        {data?.map((items) => (
          <PostCard key={items.id} items={items} />
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
