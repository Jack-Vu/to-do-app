import React from "react";
import { LIST_CONSTANT } from "../constant";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TaskType } from "../../backend/src/models";
import { useStore } from "../context";
import axios from "axios";

type MyDayType = {
  taskSelected: TaskType | null;
};

const MyDay = ({ taskSelected }: MyDayType) => {
  const { user, setTasks, updateDisplayTasks, setTaskSelected } = useStore();
  const handleMyDay = async () => {
    if (taskSelected?.creatorId !== user?._id) {
      throw new Error("Unauthorized");
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:4000/auth/editTask`,
        {
          taskId: taskSelected?._id,
          edit: {
            myDay: !taskSelected?.myDay,
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
  };
  return (
    <>
      {taskSelected?.myDay ? (
        <div className="border  mt-2 rounded-sm border-gray-200 flex text-blue-500 justify-between items-center cursor-default">
          <div className="flex p-4 gap-2 items-center">
            <div className="w-5 h-5 ">{LIST_CONSTANT[0].icon}</div>
            Added to My Day
          </div>
          <div
            className="hover:border hover:rounded text-gray-400 h-full w-[20%] flex justify-center items-center"
            onClick={handleMyDay}
          >
            <XMarkIcon className="w-5 h-5 " />
          </div>
        </div>
      ) : (
        <div
          className="border p-4 mt-2 rounded-sm border-gray-200 flex gap-2 items-center text-gray-400 cursor-default"
          onClick={handleMyDay}
        >
          <div className="w-5 h-5 ">{LIST_CONSTANT[0].icon}</div>
          Add to My Day
        </div>
      )}
    </>
  );
};

export { MyDay };
