import { useStore } from "../context";
import { LIST_CONSTANT } from "../constant";
import { TaskSearch } from "./TaskSearch";
import { UserInfoAvatar } from "./UserInfoAvatar";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

const TaskMenu = () => {
  const { listType, setListType, tasks, displayedTasks, updateDisplayTasks } =
    useStore(
      useShallow((state) => ({
        listType: state.listType,
        tasks: state.tasks,
        setListType: state.setListType,
        displayedTasks: state.displayedTasks,
        updateDisplayTasks: state.updateDisplayTasks,
      }))
    );

  useEffect(() => {
    console.log("Helllo", tasks, displayedTasks);
  }, [tasks, displayedTasks]);

  return (
    <div className="flex items-center flex-col w-[25%] h-full gap-1 pl-0 pr-2">
      <UserInfoAvatar />
      <TaskSearch />
      <ul className="menu w-full flex gap-2">
        {LIST_CONSTANT.map((list, index) => {
          let taskNumber;
          switch (list.title) {
            case "My Day":
              taskNumber = tasks.filter((task) => !!task.myDay).length;
              break;
            case "Important":
              taskNumber = tasks.filter((task) => !!task.important).length;
              break;
            case "Planned":
              taskNumber = tasks.filter((task) => !!task.dueDate).length;
              break;
            case "Assigned to me":
              taskNumber = tasks.filter((task) => !!task.important).length;
              break;
            case "Tasks":
              taskNumber = tasks.length;
              break;
            default:
              break;
          }
          return (
            <div
              key={index}
              onClick={() => {
                setListType(LIST_CONSTANT[index]);
                updateDisplayTasks(tasks);
              }}
              className={`hover:bg-gray-100 flex flex-row gap-2 h-10 items-center ${
                listType.title === list.title ? "bg-gray-100" : ""
              }`}
            >
              <div
                className={`w-full ${
                  listType.title === list.title
                    ? "border-l-2 border-blue-600"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 ml-1">
                    <div className={`w-5 h-5 ${list.textColor}`}>
                      {list.icon}
                    </div>
                    <p>{list.title}</p>
                  </div>
                  <div className="w-4 h-4 contain-content flex text-[8px] mr-2 bg-gray-300 rounded-full items-center justify-center p-2">
                    {taskNumber}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export { TaskMenu };
