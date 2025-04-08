import { StarIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useStore } from "../context";
import { TaskType } from "../../backend/src/models";
import axios from "axios";

type ImportantStarType = {
  task: TaskType | null;
  dimensions: string;
};
const ImportantStar = ({ task, dimensions }: ImportantStarType) => {
  const { listType, user, setTasks, updateDisplayTasks, setTaskSelected } =
    useStore();
  const handleImportant = async (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(task);
    e.stopPropagation();
    try {
      if (task?.creatorId !== user?._id) {
        throw new Error("Unauthorized");
      }
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:4000/auth/editTask`,
        {
          taskId: task?._id,
          edit: {
            important: !task?.important,
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
        tasks.filter((taskSelect: TaskType) => taskSelect._id === task?._id)[0]
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="z-100" onClick={handleImportant}>
      <StarIcon
        className={`${dimensions} text-gray-400 hover:text-blue-500 ml-auto ${
          task?.important
            ? listType.title === "Important"
              ? "fill-pink-800"
              : "fill-blue-500"
            : ""
        }`}
      />
    </div>
  );
};

export { ImportantStar };
