import type { Comment, Post } from '@/types/post';
import Layout from '@/components/layouts/Layout';
import { getComment, getPost } from '@/utils/query';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import CommentComponent from '@/components/post/CommentComponent';
import WriteComment from '@/components/post/WriteComment';

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
      post: post.data,
      commentSSR: commentSSR.data,
    },
  };
};

type PostProps = {
  post: Post;
  commentSSR: Comment[];
};

export default function Post({ post, commentSSR }: PostProps) {
  const [comment, setComment] = useState(commentSSR ?? []);

  return (
    <Layout>
      <div className="max-w-6xl xl:mx-auto mt-12 mx-5">
        <h1 className="text-center font-bold text-2xl mb-4">{post.title}</h1>
        <p>{post.body}</p>
        <h2 className="mt-4 mb-2 text-xl font-semibold ">Comments</h2>
        <WriteComment setComment={setComment} id={post.id} />
        {comment.map((item) => (
          <CommentComponent item={item} key={item.id} />
        ))}
      </div>
    </Layout>
  );
}
