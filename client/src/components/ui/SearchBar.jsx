import { SearchIcon } from "@/assets/icons/icons";

const SearchBar = ({ placeholder, search, setSearch }) => {
  return (
    <form className="relative group" onSubmit={(e) => e.preventDefault()}>
      <SearchIcon className="w-5 h-5 ml-2 absolute top-1/2 -translate-y-1/2 stroke-gray-300 group-focus:stoke-white" />
      <label htmlFor="search" className="absolute -top-96">
        Search
      </label>
      <input
        name="search"
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg pl-8 pr-2 py-0.75 bg-transparent focus:outline-none ring-none border-2 border-card-hover
        text-prim-text placeholder:text-second-text focus:placeholder:text-second-text hover:bg-card-hover focus:bg-card-hover"
      />
    </form>
  );
};

export default SearchBar;
