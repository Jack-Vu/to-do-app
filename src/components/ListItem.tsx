import { useCallback, useEffect, useRef } from "react";
import { useStore } from "../context";
import { TaskInput } from "./TaskInput";

const ListItem = () => {
  const { setInputActive, listType, displayedTasks } = useStore();
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
      <div>
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
        <div>
          {displayedTasks?.map((task) => {
            return <div>{`${task.task}`}</div>;
          })}
        </div>
      </div>
      <div ref={containerRef}>
        <TaskInput />
      </div>
    </div>
  );
};

export { ListItem };
