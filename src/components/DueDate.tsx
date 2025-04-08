import React, { useState } from "react";
import { useStore } from "../context";
import { CalendarDateRangeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { DatePicker } from "./DatePicker";

const DueDate = () => {
  const { taskSelected } = useStore();
  const [datePicked, setDatePicked] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const dueDate = taskSelected?.dueDate
    ? new Date(taskSelected.dueDate.toString()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : undefined;
  const dueDateComparedToToday = taskSelected?.dueDate
    ? isBeforeToday(taskSelected?.dueDate.toString())
    : undefined;
  function isBeforeToday(taskDate: string | undefined) {
    if (!taskDate) {
      return false;
    }
    const today = new Date();
    const inputDate = new Date(taskDate);
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    if (inputDate < today) {
      return "Late";
    } else if (today.getTime() === inputDate.getTime()) {
      return "Today";
    } else {
      return "Future";
    }
  }

  return (
    <>
      {dueDate ? (
        <div
          className={`${dueDateComparedToToday === "Late" && "text-red-600"} ${
            dueDateComparedToToday === "Today" && "text-blue-500"
          } ${
            dueDateComparedToToday === "Future" && "text-blue-500"
          } border-b-1  border-gray-200 flex items-center `}
        >
          <div className="hover:bg-gray-100 py-3 flex grow rounded">
            <CalendarDateRangeIcon className="w-5 h-5 ml-4 mr-2" />
            {dueDate && dueDateComparedToToday === "Today" ? (
              "Due Today"
            ) : (
              <>{dueDate}</>
            )}
          </div>
          <div className=" w-[20%] py-[13px] hover:rounded hover:border text-gray-400 flex justify-center items-center">
            <XMarkIcon className="w-5 h-5" />
          </div>
        </div>
      ) : (
        <div
          className={`border-b-1 text-gray-400 border-gray-200 flex items-center `}
        >
          <div
            className="hover:bg-gray-100 h-[56px] flex grow  rounded"
            onClick={() => setOpen(true)}
          >
            <div className="w-full h-full">
              <DatePicker
                date={datePicked}
                setDate={setDatePicked}
                anchor="--anchor-3"
                parentOpen={open}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { DueDate };
