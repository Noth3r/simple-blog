import type { Comment, Post } from '@/types/post';
import Layout from '@/components/layouts/Layout';
import { getComment, getPost, postComment } from '@/utils/query';
import { GetServerSideProps } from 'next';
import { FormEvent, useState } from 'react';
import useAuth from '@/hooks/useAuth';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (!id) {
    return {
      notFound: true,
    };
  }

  const commentSSR = await getComment(parseInt(id as string));
  const post = await getPost(parseInt(id as string));
  return {
    props: {
      post,
      commentSSR,
    },
  };
};

export default function Post({
  post,
  commentSSR,
}: {
  post: Post;
  commentSSR: Comment[];
}) {
  const [comment, setComment] = useState(commentSSR ?? []);
  console.log(comment);

  const auth = useAuth();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await postComment(post.id, {
      name: auth?.data?.name,
      email: auth?.data?.email,
      body: e.currentTarget.body.value,
    });

    console.log(res);

    if (!res) return;

    setComment((prev) => [res, ...prev]);
  };
  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-12">
        <h1 className="text-center font-bold text-2xl mb-4">{post.title}</h1>
        <p>{post.body}</p>
        <h2 className="mt-4 mb-2 text-xl font-semibold ">Comments</h2>
        <form className="mb-4 flex" onSubmit={submitHandler}>
          <input
            type="text"
            name="body"
            className="border rounded w-full px-2 py-2"
            placeholder="Write your comments..."
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          >
            Submit
          </button>
        </form>
        {comment.map((item) => (
          <div className="pl-4 border-2 rounded-xl py-4 mb-2" key={item.id}>
            <h3 className="font-semibold flex gap-1 items-center">
              <div className="w-7 h-7 border rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
              </div>
              {item.name}
            </h3>
            <p className="ml-4 mt-1">{item.body}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
