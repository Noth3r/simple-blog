import useDebounce from '@/hooks/useDebounce';
import { User } from '@/types/user';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type SearchComponentProps = {
  user: User[];
  setUser: Dispatch<SetStateAction<User[]>>;
  setPagination: Dispatch<SetStateAction<number>>;
};

const SearchComponent = ({
  user,
  setUser,
  setPagination,
}: SearchComponentProps) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 750);

  useEffect(() => {
    const searchHandler = (data: string) => {
      const filtered = user.filter((item) => {
        return (
          item.name.toLowerCase().includes(data.toLowerCase()) ||
          item.email.toLowerCase().includes(data.toLowerCase())
        );
      });

      setPagination(0);
      setUser(filtered);
    };

    searchHandler(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
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
  );
};

export default SearchComponent;
