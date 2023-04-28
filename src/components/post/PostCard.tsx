import { Post } from '@/types/post';
import Link from 'next/link';

const PostCard = ({ items }: { items: Post }) => {
  return (
    <Link href={`/post/${items.id}`}>
      <div className="border-2 mx-5 rounded-xl px-6 xl:px-8 py-3 xl:py-4 mb-4 transition hover:scale-105">
        <h1 className="text-lg xl:text-2xl font-bold">{items.title}</h1>
        <p className="truncate">{items.body}</p>
      </div>
    </Link>
  );
};

export default PostCard;
