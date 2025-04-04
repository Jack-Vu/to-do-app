import { useCallback, useEffect, useRef } from "react";
import { useStore } from "../context";
import { TaskInput } from "./TaskInput";
import Task from "./Task";
import { useShallow } from "zustand/shallow";

const ListItem = () => {
  const { setInputActive, listType, displayedTasks } = useStore(
    useShallow((state) => ({
      setInputActive: state.setInputActive,
      listType: state.listType,
      displayedTasks: state.displayedTasks,
    }))
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setInputActive(false);
      }
    },
    [setInputActive]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      className={`w-full h-full border rounded-3xl p-10 flex flex-col justify-between bg-cover bg-center ${listType.url}`}
    >
      <div
        className={`${
          listType.title === "My Day" || listType.title === "Tasks"
            ? "text-white"
            : listType.textColor
        }
        flex gap-2 items-center text-xl`}
      >
        <div className={"w-7 h-7"}>{listType.icon}</div>
        {listType.title}
      </div>
      <div className="flex flex-col grow gap-0.5 max-h-[80%] overflow-clip overflow-y-auto">
        {displayedTasks &&
          displayedTasks[0]?.map((task, index) => {
            return (
              <div key={`${index}${task.createdAt}`}>
                <Task task={task} />
              </div>
            );
          })}
        {displayedTasks && displayedTasks[1]?.length > 0 && (
          <>
            <div>Completed Task</div>
            {displayedTasks[1]?.map((task, index) => {
              return (
                <div key={`${index}${task.createdAt}`}>
                  <Task task={task} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <div ref={containerRef}>
        <TaskInput />
      </div>
    </div>
  );
};

export { ListItem };
