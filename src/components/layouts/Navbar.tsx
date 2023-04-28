import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="font-sans w-full relative drop-shadow-2xl border-b-2">
      <div className="max-w-7xl mx-auto flex justify-between py-2 2xl:py-4 items-center px-4">
        <Link href="/">
          <div className="cursor-pointer animate-bounce font-semibold">
            Logo
          </div>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden"
          aria-expanded="false"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <ul className="hidden md:flex gap-8">
          <ListNav />
        </ul>

        {isOpen && (
          <div className="absolute top-0 left-0 bg-white w-full mx-auto">
            <svg
              onClick={() => setIsOpen(!isOpen)}
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 absolute right-6 top-4 cursor-pointer"
              viewBox="0 0 384 512"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
            <div className="pt-4 pl-4 flex flex-col gap-4 mb-6">
              <div className="font-semibold">Logo</div>
              <ul className="flex flex-col gap-1">
                <ListNav />
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

const ListNav = () => {
  const auth = useAuth();

  return (
    <>
      <Link href="/user">
        <li className="cursor-pointer hover:scale-110 transition font-semibold">
          List Users
        </li>
      </Link>
      <Link href="/">
        <li className="cursor-pointer hover:scale-110 transition font-semibold">
          Home
        </li>
      </Link>
      {auth?.data?.isLogin && (
        <Link href="/dashboard">
          <li className="cursor-pointer hover:scale-110 transition font-semibold">
            Dashboard
          </li>
        </Link>
      )}
      {auth?.data?.isLogin ? (
        <li
          onClick={() => auth?.logout()}
          className="cursor-pointer hover:scale-110 transition font-semibold"
        >
          Sign Out
        </li>
      ) : (
        <Link href="/auth/signin">
          <li className="cursor-pointer hover:scale-110 transition font-semibold">
            Sign In
          </li>
        </Link>
      )}
    </>
  );
};
