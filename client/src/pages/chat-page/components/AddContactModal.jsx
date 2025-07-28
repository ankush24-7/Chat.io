import FoundUserCard from "./FoundUserCard";
import userAPI from "@/services/api/userAPI";
import { useUser } from "@/contexts/userContext";
import { useEffect, useState, forwardRef } from "react";
import { Close, SearchIcon } from "@/assets/icons/icons";

const AddContactModal = forwardRef(({ setShowModal }, ref) => {
  const [search, setSearch] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const { user: currentUser, contacts } = useUser();

  useEffect(() => {
    const searchUsers = async () => {
      try {
        if (!search) return setFoundUsers([]);
        let { status, data } = await userAPI.searchUsers(search);
        if (status === 200) {
          data = data.filter((user) => !contacts.some((c) => c._id === user._id));
          const foundUsers = data.map((user) => (
            <FoundUserCard
              key={user._id}
              user={user}
              label={
                user.requests.find((req) => req.sender._id === currentUser._id)
                  ? "Requested"
                  : "Add"
              }
            />
          ));
          setFoundUsers(foundUsers);
        } else throw new Error(data);
      } catch (error) {
        console.log(error);
      }
    };

    searchUsers();
  }, [search]);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/60">
      <div
        ref={ref}
        className="w-[95%] h-8/10 lg:w-96 lg:h-96 rounded-2xl p-3 flex flex-col gap-2 bg-card">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-prim-text">Add Contact</h2>
          <button
            onClick={() => setShowModal(false)}
            className="cursor-pointer rounded-full p-1 hover:bg-card-hover">
            <Close className="w-5 h-5" />
          </button>
        </div>

        <form
          className="relative group mt-1.5"
          onSubmit={(e) => e.preventDefault()}>
          <SearchIcon className="absolute top-1/2 -translate-y-1/2 ml-2 stroke-gray-300 group-focus:stoke-white" />
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            name="search"
            type="text"
            placeholder="Search"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl w-full pl-10 pr-2 py-1.5 bg-transparent ring-[1.25px] focus:outline-none ring-white text-white placeholder:text-gray-400 focus:placeholder:text-gray-400 hover:bg-prim-black focus:bg-prim-black"
          />
        </form>

        {foundUsers.length !== 0 && (
          <div className="max-h-84 overflow-y-scroll vertical-scrollbar">
            <div className="flex flex-col pr-1">{foundUsers}</div>
          </div>
        )}
      </div>
    </div>
  );
});

export default AddContactModal;
