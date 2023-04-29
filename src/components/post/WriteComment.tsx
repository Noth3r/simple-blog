import useAuth from '@/hooks/useAuth';
import { Comment } from '@/types/post';
import { postComment } from '@/utils/query';
import { Dispatch, FormEvent, SetStateAction, useRef } from 'react';

const WriteComment = ({
  setComment,
  id,
}: {
  setComment: Dispatch<SetStateAction<Comment[]>>;
  id: number;
}) => {
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await postComment(id, {
      name: auth?.data?.name,
      email: auth?.data?.email,
      body: e.currentTarget.body.value,
    });

    if (!res) return;

    inputRef.current!.value = '';
    setComment((prev) => [res.data, ...prev]);
  };

  return (
    <form className="mb-4 flex" onSubmit={submitHandler}>
      <input
        ref={inputRef}
        autoComplete="off"
        type="text"
        name="body"
        className="border rounded w-full px-2 py-2 focus:outline-blue-500"
        placeholder={
          auth?.data?.isLogin
            ? 'Write your comments...'
            : 'Sign in to write comments'
        }
        required
        disabled={!auth?.data?.isLogin}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded ml-2 disabled:opacity-80 "
        disabled={!auth?.data?.isLogin}
      >
        Submit
      </button>
    </form>
  );
};

export default WriteComment;
