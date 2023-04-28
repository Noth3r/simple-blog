import Layout from '@/components/layouts/Layout';
import useDebounce from '@/hooks/useDebounce';
import { User } from '@/types/user';
import { getUsers } from '@/utils/query';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await getUsers();
  return {
    props: {
      user,
    },
  };
};

export default function User(props: { user: User[] }) {
  const [user, setUser] = useState(props.user);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 750);

  useEffect(() => {
    const searchHandler = (data: string) => {
      const filtered = props.user.filter((item) => {
        return (
          item.name.toLowerCase().includes(data.toLowerCase()) ||
          item.email.toLowerCase().includes(data.toLowerCase())
        );
      });

      setUser(filtered);
    };

    searchHandler(debouncedSearch);
  }, [debouncedSearch, props.user]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto my-8">
        <h1 className="text-center text-2xl font-bold">Users List</h1>
        <div className="mt-4 border rounded-lg w-full overflow-hidden flex items-center justify-between px-4">
          <input
            type="text"
            name="body"
            className="py-2 focus:outline-none flex-1"
            placeholder="Find User"
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </div>
        {user.map((user) => {
          return <UserComponent key={user.id} user={user} />;
        })}
      </div>
    </Layout>
  );
}

const UserComponent = ({ user }: { user: User }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  const asteriks = (id: number) => {
    const id_length = id.toString().length;
    const asteriks = '*'.repeat(id_length);
    return asteriks;
  };

  return (
    <div className="flex flex-col mt-4 border-2 px-4 py-2 rounded-xl">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <p className="font-bold">Name</p>
          <p className="font-bold">Email</p>
          <p className="font-bold">ID</p>
        </div>
        <div className="flex flex-col ml-4">
          <p>: {user.name}</p>
          <p>: {user.email}</p>
          <div className="flex items-center gap-2">
            : {show ? user.id : asteriks(user.id!)}{' '}
            <div
              className="w-5 h-5 flex items-center justify-center cursor-pointer"
              onClick={toggleShow}
            >
              {show ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};