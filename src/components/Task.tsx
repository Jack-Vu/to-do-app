import { TaskType } from "../../backend/src/models";
import { useStore } from "../context";
import { ArrowPathIcon, StarIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { LIST_CONSTANT } from "../constant";
import axios from "axios";

type TaskProps = {
  task: TaskType;
};
const Task = ({ task }: TaskProps) => {
  const { listType, setTasks, user, setDisplayedTasks } = useStore();
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
      console.log("Tasks", tasks);
      setTasks((tasks));
      switch (listType.title) {
        case "My Day":
          setDisplayedTasks([
            tasks.filter((task: TaskType) => task.myDay && !task.completed),
            tasks.filter((task: TaskType) => task.myDay && task.completed),
          ]);
          break;
        case "Important":
          setDisplayedTasks([
            tasks.filter((task: TaskType) => task.important && !task.completed),
            tasks.filter((task: TaskType) => task.important && task.completed),
          ]);
          break;
        case "Planned":
          setDisplayedTasks([
            tasks.filter((task: TaskType) => task.dueDate && !task.completed),
            tasks.filter((task: TaskType) => task.dueDate && task.completed),
          ]);
          break;
        case "Assigned to me":
          setDisplayedTasks([
            tasks.filter((task: TaskType) => task.myDay && !task.completed),
            tasks.filter((task: TaskType) => task.myDay && task.completed),
          ]);
          break;
        case "Tasks":
          setDisplayedTasks([
            tasks.filter((task: TaskType) => !task.completed),
            tasks.filter((task: TaskType) => task.completed),
          ]);
          break;
        default:
          break;
      }
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
          <div className="flex gap-1 text-[10px] text-gray-500">
            {[
              task.myDay && listType.title !== "My Day" && (
                <div className="flex items-center  gap-1">
                  <div className="w-3 h-3">{LIST_CONSTANT[0].icon}</div>
                  {LIST_CONSTANT[0].title}
                </div>
              ),
              listType.title !== "Tasks" && <div>{"Tasks"}</div>,
              task.dueDate && <div>{`${task.dueDate}`}</div>,
              task.repeatInterval && <ArrowPathIcon className="w-3 h-3" />,
            ]
              .filter(Boolean)
              .map((element, index) => {
                return (
                  <div key={index} className="flex gap-1">
                    {index > 0 && <span className="text-gray-400">•</span>}
                    {element}
                  </div>
                );
              })}
          </div>
        </div>
        <StarIcon className="w-4 h-4 text-gray-400 hover:text-blue-500" />
      </div>
    </div>
  );
};

export default Task;
