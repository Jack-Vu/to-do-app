import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useEffect, useRef } from "react";
import { useStore } from "../context";

const TaskSearch = () => {
  const { isSearching, setIsSearching, searchInput, setSearchInput } =
    useStore();

  const inputRef = useRef(null);

  useEffect(() => {
    if (searchInput) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchInput, setIsSearching]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="input input-sm w-[90%] !border-gray-300 !outline-none">
      <input
        type="text"
        value={searchInput}
        onChange={handleChange}
        placeholder="Search"
        className="grow"
        ref={inputRef}
        onFocus={() => setIsSearching(true)}
      />
      <div className="flex gap-1 text-gray-400">
        {isSearching ? (
          <XMarkIcon
            className="w-5 h-5 cursor-default"
            onClick={() => {
              setSearchInput("");
              setIsSearching(false);
            }}
          />
        ) : null}
        <MagnifyingGlassIcon className="w-5 h-5 cursor-default scale-x-[-1]" />
      </div>
    </div>
  );
};

export { TaskSearch };
