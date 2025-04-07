import { CalendarDateRangeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useStore } from "../context";
import { ChangeEvent, useRef, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { useShallow } from "zustand/shallow";
import { DayPicker } from "react-day-picker";

const TaskInput = () => {
  const { user, isInputActive, setInputActive, setTasks, updateDisplayTasks } =
    useStore(
      useShallow((state) => ({
        user: state.user,
        isInputActive: state.isInputActive,
        setInputActive: state.setInputActive,
        setTasks: state.setTasks,
        updateDisplayTasks: state.updateDisplayTasks,
      }))
    );
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
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

  const handleSubmit = async () => {
    if (input.trim() == "" || !canSubmit) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:4000/auth/createTask`,
        {
          task: input,
          dueDate: date ? date : undefined,
          creatorId: user?._id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const tasks = await response.data;
      setTasks(tasks);
      updateDisplayTasks(tasks);
    } catch (error) {
      console.error(error);
      return;
    }
    setInput("");
    setDate(undefined);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {isInputActive ? (
        <div className="input w-full py-7 bg-white border-gray-300 !outline-none shadow-md flex items-center">
          <div className="w-full flex items-center">
            <button
              className="btn btn-circle w-5 h-5 bg-inherit border-black border-2 !outline-none mr-2"
              onClick={handleSubmit}
            />
            <input
              ref={inputRef}
              autoFocus
              type="text"
              className="grow"
              onChange={handleChange}
              value={input}
              placeholder='Try tying "Pay utilities bill Friday by 6 pm"'
            />
          </div>

          <div
            className={`hover:border hover:rounded-md ${
              date ? "" : "hover:border-r-"
            }`}
          >
            <button
              popoverTarget="rdp-popover"
              className="input !outline-none !border-none  cursor-default flex items-center justify-center"
              onClick={() => setOpen(true)}
              style={{ anchorName: "--anchor-1" } as React.CSSProperties}
            >
              <CalendarDateRangeIcon className="w-5 h-5 p-0 m-0" />
              {date && date.toLocaleDateString()}
            </button>
            {open && (
              <div
                popover="auto"
                id="rdp-popover"
                className="dropdown w-fit"
                style={
                  {
                    positionAnchor: "--anchor-1",
                    transform: "translateY(-300px) translateX(-200px)",
                  } as React.CSSProperties
                }
              >
                <DayPicker
                  className="react-day-picker"
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  footer={
                    <div className="flex justify-evenly">
                      <button
                        className="btn w-[100px]"
                        onClick={() => {
                          setDate(undefined);
                          setOpen(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn w-[100px] bg-blue-800 text-white"
                        onClick={() => setOpen(false)}
                      >
                        Save
                      </button>
                    </div>
                  }
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className="input w-full  bg-gray-100 py-7 hover:bg-white !outline-none !border-none"
          onClick={() => setInputActive(true)}
        >
          <div className="flex grow">
            <PlusIcon
              className="w-5 h-5 mr-2"
              onClick={(e) => {
                e.stopPropagation();
                setInputActive(true);
              }}
              cursor="default"
            />
            {input ? `${input}` : "Add Task"}
          </div>
          {date && (
            <div>
              <button className="input rounded-none border-none bg-inherit border cursor-default outline-none">
                <CalendarDateRangeIcon className="w-5 h-5" />
                {date.toLocaleDateString()}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export { TaskInput };
