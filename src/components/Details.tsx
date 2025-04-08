import { LIST_CONSTANT } from "../constant";
import { TaskType } from "../../backend/src/models";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useStore } from "../context";
import { useShallow } from "zustand/shallow";

type DetailsProps = {
  task: TaskType;
};

const Details = ({ task }: DetailsProps) => {
  const { listType } = useStore(
    useShallow((state) => ({
      listType: state.listType,
    }))
  );

  const dateDue = task.dueDate
    ? new Date(task.dueDate.toString()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : undefined;
  const late = task.dueDate
    ? isBeforeToday(task.dueDate.toString())
    : undefined;

  function isBeforeToday(taskDate: string | undefined): boolean {
    if (!taskDate) {
      return false;
    }
    const today = new Date();
    const inputDate = new Date(taskDate);
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    return inputDate < today;
  }
  return (
    <div className="flex gap-1 text-[10px] text-gray-500">
      {[
        task.myDay && listType.title !== "My Day" && (
          <div className="flex items-center  gap-1">
            <div className="w-3 h-3">{LIST_CONSTANT[0].icon}</div>
            {LIST_CONSTANT[0].title}
          </div>
        ),
        listType.title !== "Tasks" && <div>{"Tasks"}</div>,
        task.dueDate && (
          <div className={`${late ? "text-red-600" : ""}`}>{`${dateDue}`}</div>
        ),
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
  );
};

export default Details;
