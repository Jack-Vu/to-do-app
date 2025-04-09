import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { useStore } from "../context";
import axios from "axios";
import { TaskType } from "../../backend/src/models";

type DatePickerProps = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  anchor: string;
  input?: boolean;
  parentOpen?: boolean;
};

const DatePicker = ({ date, setDate, anchor, input }: DatePickerProps) => {
  const { taskSelected, user, setTasks, updateDisplayTasks, setTaskSelected } =
    useStore();
  const [open, setOpen] = useState(false);

  const handleAddDueDate = async () => {
    try {
      if (taskSelected?.creatorId !== user?._id) {
        throw new Error("Unauthorized");
      }
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:4000/auth/editTask`,
        {
          taskId: taskSelected?._id,
          edit: {
            dueDate: date,
          },
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const tasks = await response.data.userTasks;
      setTasks(tasks);
      updateDisplayTasks(tasks);
      setTaskSelected(
        tasks.filter((task: TaskType) => task._id === taskSelected?._id)[0]
      );
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
  };

  return (
    <div
      className={`${
        input ? "hover:border hover:rounded-md py-2" : " h-full flex"
      }`}
    >
      <button
        popoverTarget="rdp-popover"
        className={`outline-none border-none w-full cursor-default flex items-center ${
          date && "pr-2"
        }`}
        style={{ anchorName: `${anchor}` } as React.CSSProperties}
        onClick={() => setOpen(true)}
      >
        <CalendarDateRangeIcon
          className={`w-5 h-5 mr-2 ${!input ? "ml-4" : "ml-2"}`}
        />
        {date && date.toLocaleDateString()}
        {!input && !date && "Add due date"}
      </button>
      {open && (
        <div
          popover="auto"
          id="rdp-popover"
          className="dropdown w-fit"
          style={
            {
              positionAnchor: `${anchor}`,
              transform: `${
                input ? "translateY(-300px) translateX(-200px)" : ""
              }`,
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
                  onClick={() => {
                    if (!input) {
                      handleAddDueDate();
                    } else {
                      setOpen(false);
                    }
                  }}
                >
                  Save
                </button>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

export { DatePicker };
