import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const TaskSearch = () => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (input) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [input]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <label className="input input-sm w-[90%] !border-gray-300 !outline-none">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search"
        className="grow"
        ref={inputRef}
      />
      <div className="flex gap-1">
        {isTyping ? (
          <XMarkIcon
            className="w-5 h-5 cursor-default"
            onClick={() => {
              setInput("");
            }}
          />
        ) : null}
        <MagnifyingGlassIcon className="w-5 h-5 cursor-default scale-x-[-1]" />
      </div>
    </label>
  );
};

export { TaskSearch };
