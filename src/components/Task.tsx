import { TaskType } from "../../backend/src/models";
import { useStore } from "../context";
import { CheckIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useShallow } from "zustand/shallow";
import Details from "./Details";
import { ImportantStar } from "./ImportantStar";

type TaskProps = {
  task: TaskType;
};
const Task = ({ task }: TaskProps) => {
  const {
    setTasks,
    user,
    updateDisplayTasks,
    setTaskDetailsOpen,
    setTaskSelected,
    taskSelected,
  } = useStore(
    useShallow((state) => ({
      setTasks: state.setTasks,
      tasks: state.tasks,
      user: state.user,
      updateDisplayTasks: state.updateDisplayTasks,
      setTaskDetailsOpen: state.setTaskDetailsOpen,
      setTaskSelected: state.setTaskSelected,
      taskSelected: state.taskSelected,
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

  return (
    <div
      className="flex flex-col p-2 gap-1 input w-full h-full bg-white items-start  !outline-none shadow-md cursor-default"
      onClick={() => {
        if (task._id === taskSelected?._id) {
          setTaskDetailsOpen(false);
          setTaskSelected(null);
        } else {
          setTaskDetailsOpen(true);
          setTaskSelected(task);
        }
      }}
    >
      <div className="flex flex-row items-start w-full">
        <button
          className={`btn btn-circle w-4 h-4 border-black !outline-none mr-2 mt-0.5 flex items-center justify-center cursor-default ${
            task.completed ? "border-gray-500 bg-gray-600" : ""
          }`}
          onClick={handleCompleted}
        >
          <CheckIcon
            className={`opacity-0 hover:opacity-100 transition-opacity w-full h-full font-extrabold ${
              task.completed ? "opacity-100 text-white" : ""
            }`}
          />
        </button>
        <div className="w-[95%] flex flex-col gap-1 mr-1">
          <div
            className={`w-full h-fit text-wrap break-words textarea-sm ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.task}
          </div>
          <Details task={task} />
        </div>
        <ImportantStar task={task} dimensions="w-4 h-4" />
      </div>
    </div>
  );
};

export default Task;
