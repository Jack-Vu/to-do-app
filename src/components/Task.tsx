import { TaskType } from "../../backend/src/models";
import { useStore } from "../context";
import { StarIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useShallow } from "zustand/shallow";
import Details from "./Details";

type TaskProps = {
  task: TaskType;
};
const Task = ({ task }: TaskProps) => {
  const { setTasks, user, updateDisplayTasks } = useStore(
    useShallow((state) => ({
      setTasks: state.setTasks,
      tasks: state.tasks,
      user: state.user,
      updateDisplayTasks: state.updateDisplayTasks,
    }))
  );

  const handleCompleted = async () => {
    if (task.creatorId !== user?._id) {
      throw new Error("Unauthorized");
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:4000/auth/editTask`,
        {
          taskId: task._id,
          edit: {
            completed: !task.completed,
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleImportant = async () => {
    if (task.creatorId !== user?._id) {
      throw new Error("Unauthorized");
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:4000/auth/editTask`,
        {
          taskId: task._id,
          edit: {
            important: !task.important,
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
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col p-2 gap-1 input w-full h-full bg-white items-start  !outline-none shadow-md cursor-default">
      <div className="flex flex-row items-start w-full">
        <button
          className={`btn btn-circle w-4 h-4 bg-inherit border-black !outline-none mr-2 mt-0.5 flex items-center justify-center cursor-default ${
            task.completed ? "border-gray-500" : ""
          }`}
          onClick={handleCompleted}
        >
          <CheckIcon
            className={`opacity-0 hover:opacity-100 transition-opacity w-2 h-2 font-extrabold ${
              task.completed ? "opacity-100 text-gray-500" : ""
            }`}
          />
        </button>
        <div className="w-full flex flex-col gap-1 mr-1">
          <div
            className={`flex w-full h-fit text-wrap textarea-sm ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.task}
          </div>
          <Details task={task} />
        </div>
        <StarIcon
          className={`w-4 h-4 text-gray-400 hover:text-blue-500 ${
            task.important ? "fill-blue-500" : ""
          }`}
          onClick={handleImportant}
        />
      </div>
    </div>
  );
};

export default Task;
