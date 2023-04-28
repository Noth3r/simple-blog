import useAuth from '@/hooks/useAuth';
import { User } from '@/types/user';
import { deleteUser } from '@/utils/query';
import { MouseEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const EditProfile = () => {
  const auth = useAuth();
  const { register, handleSubmit, setValue } = useForm<User>({
    defaultValues: {
      ...auth?.data,
    },
  });

  useEffect(() => {
    if (auth?.data) {
      setValue('email', auth?.data?.email!);
      setValue('name', auth?.data?.name!);
      setValue('gender', auth?.data?.gender!);
      setValue('id', auth?.data?.id!);
      setValue('status', auth?.data?.status!);
    }
  }, [auth, setValue]);

  const submitHandler = handleSubmit(async (data) => {
    const res = auth?.updateUser(data);

    if (!res) return;
  });

  const deleteHandler = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    await deleteUser(auth?.data?.id!);

    auth?.logout();
  };

  return (
    <div className="border-2 p-4 rounded-xl max-w-4xl mx-auto mt-6">
      <h1 className="text-center text-xl font-semibold">Edit Profile</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-3 mt-2">
        <div className="flex flex-col">
          <label>Email</label>
          <input
            className="border rounded px-2 py-1 mt-1"
            {...register('email')}
            type="email"
            placeholder="email"
            defaultValue={auth?.data?.email}
          />
        </div>
        <div className="flex flex-col">
          <label>Name</label>
          <input
            className="border rounded px-2 py-1 mt-1"
            {...register('name')}
            type="text"
            placeholder="name"
            defaultValue={auth?.data?.name}
          />
        </div>
        <div className="flex flex-col">
          <label>Gender</label>
          <select
            className="border rounded px-2 py-1 mt-1"
            {...register('gender')}
            defaultValue={auth?.data?.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mx-auto flex gap-4">
          <button
            onClick={(e) => deleteHandler(e)}
            className="mx-auto bg-red-500 hover:bg-red-500/90 text-white px-4 py-2 rounded-lg"
          >
            Delete Account
          </button>
          <input
            type="submit"
            className="cursor-pointer mx-auto bg-blue-600 hover:bg-blue-600/90 text-white px-4 py-2 rounded-lg"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
