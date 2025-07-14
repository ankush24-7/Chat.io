import { useUser } from "@/contexts/userContext";

const PersonalInfo = () => {
  const { user } = useUser();
  return (
    <div className="w-full flex flex-col px-3 py-2 mt-2 gap-4">
      <div className="flex flex-col gap-1.5">
        <p className="text-sm leading-3 text-gray-300">Full Name</p>
        <p className="w-full p-1.5 text-ellipsis overflow-hidden whitespace-nowrap rounded-xl border border-white/20 text-white">
          {user.fullName}
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-sm leading-3 text-gray-300">Username</p>
        <p className="w-full p-1.5 text-ellipsis overflow-hidden whitespace-nowrap rounded-xl border border-white/20 text-white">
          {user.username}
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-sm leading-3 text-gray-300">Email</p>
        <p className="w-full p-1.5 text-ellipsis overflow-hidden whitespace-nowrap rounded-xl border border-white/20 text-white">
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default PersonalInfo;
