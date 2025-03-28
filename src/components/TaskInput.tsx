import { PlusIcon } from "@heroicons/react/24/outline";
import { useStore } from "../context";
import { ChangeEvent, useRef, useState } from "react";
import { debounce } from "lodash";

const TaskInput = () => {
  const { isInputActive, setInputActive } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const debounceEnableSubmit = debounce((value: string) => {
    if (value.trim() !== "") {
      setCanSubmit(true);
    }
  }, 1500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setCanSubmit(false);
    debounceEnableSubmit(e.target.value);
  };

  const handleSubmit = () => {
    if (input.trim() == "" || !canSubmit) {
      return;
    }
    console.log(input);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setInput("");
  };

  return (
    <>
      {isInputActive ? (
        <div className="input w-full bg-white border-gray-300 !outline-none shadow-md">
          <button
            className="btn btn-circle w-5 h-5 bg-inherit border-black border-2 !outline-none"
            onClick={handleSubmit}
          />
          <input
            ref={inputRef}
            autoFocus
            type="text"
            className="w-full"
            onChange={handleChange}
            value={input}
            placeholder='Try tying "Pay utilities bill Friday by 6 pm"'
          />
        </div>
      ) : (
        <div
          className="input w-full  bg-gray-100  hover:bg-white"
          onClick={() => setInputActive(true)}
        >
          <PlusIcon
            className="w-5 h-5"
            onClick={(e) => {
              e.stopPropagation();
              setInputActive(true);
            }}
            cursor="default"
          />
          Add Task
        </div>
      )}
    </>
  );
};

export { TaskInput };
