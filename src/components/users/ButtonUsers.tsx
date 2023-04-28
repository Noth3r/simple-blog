import { User } from '@/types/user';
import { Dispatch, SetStateAction } from 'react';

const ButtonUsers = ({
  next = true,
  user,
  setPagination,
  pagination,
}: {
  next: boolean;
  user: User[];
  setPagination: Dispatch<SetStateAction<number>>;
  pagination: number;
}) => {
  const onClickHandler = () => {
    if (next) {
      setPagination((prev) => prev + 10);
    } else {
      setPagination((prev) => prev - 10);
    }
  };

  const disabled = next
    ? pagination >= 90 || user.length - pagination < 10
    : pagination <= 0;

  return (
    <button
      onClick={() => onClickHandler()}
      disabled={disabled}
      className="w-5 h-5 flex justify-center items-center disabled:opacity-50"
    >
      {next ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      )}
    </button>
  );
};

export default ButtonUsers;
