import Layout from '@/components/layouts/Layout';
import ButtonUsers from '@/components/users/ButtonUsers';
import SearchComponent from '@/components/users/SearchComponent';
import UserComponent from '@/components/users/UserComponent';
import { User } from '@/types/user';
import { getUsers } from '@/utils/query';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await getUsers();
  return {
    props: {
      user,
    },
  };
};

export default function User(props: { user: User[] }) {
  const [user, setUser] = useState(props.user.slice(0, 10));
  const [pagination, setPagination] = useState(0);
  const disabledAll =
    pagination >= 90 || (user.length - pagination < 10 && pagination <= 0);

  return (
    <Layout>
      <div className="max-w-5xl mx-5 xl:mx-auto my-8">
        <h1 className="text-center text-2xl font-bold">Users List</h1>
        <SearchComponent
          user={props.user}
          setUser={setUser}
          setPagination={setPagination}
        />
        <div className="overflow-hidden">
          {user.slice(pagination, pagination + 10).map((user) => (
            <UserComponent key={user.id} user={user} />
          ))}
        </div>
        {!disabledAll && (
          <div className="flex gap-2 justify-center items-center my-8">
            <ButtonUsers
              user={user}
              setPagination={setPagination}
              pagination={pagination}
              next={false}
            />
            <span className="font-bold text-xl">{pagination / 10 + 1}</span>
            <ButtonUsers
              user={user}
              setPagination={setPagination}
              pagination={pagination}
              next={true}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
