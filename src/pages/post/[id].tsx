import type { Comment, Post } from '@/types/post';
import Layout from '@/components/layouts/Layout';
import { getComment, getPost, postComment } from '@/utils/query';
import { GetServerSideProps } from 'next';
import { FormEvent, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import CommentComponent from '@/components/post/CommentComponent';

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

type PostProps = {
  post: Post;
  commentSSR: Comment[];
};

export default function Post({ post, commentSSR }: PostProps) {
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
            placeholder={
              auth?.data?.isLogin
                ? 'Write your comments...'
                : 'Login to write comments'
            }
            required
            disabled={!auth?.data?.isLogin}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2 disabled:opacity-80"
            disabled={!auth?.data?.isLogin}
          >
            Submit
          </button>
        </form>
        {comment.map((item) => (
          <CommentComponent item={item} key={item.id} />
        ))}
      </div>
    </Layout>
  );
}
