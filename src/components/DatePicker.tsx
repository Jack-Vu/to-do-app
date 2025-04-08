import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";

type DatePickerProps = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="hover:border hover:rounded-md p-2">
      <button
        popoverTarget="rdp-popover"
        className=" outline-none  border-none   cursor-default flex items-center justify-center"
        onClick={() => setOpen(true)}
        style={{ anchorName: "--anchor-1" } as React.CSSProperties}
      >
        <CalendarDateRangeIcon className="w-5 h-5" />
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
  );
};

export default DatePicker;
