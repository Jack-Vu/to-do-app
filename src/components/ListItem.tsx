import { useCallback, useEffect, useRef } from "react";
import { useStore } from "../context";
import { TaskInput } from "./TaskInput";
import Task from "./Task";
import { useShallow } from "zustand/shallow";
import { TaskType } from "../../backend/src/models";
import { LIST_CONSTANT } from "../constant";

const ListItem = () => {
  const {
    setInputActive,
    listType,
    tasks,
    displayedTasks,
    taskDetailsOpen,
    isSearching,
    searchInput,
  } = useStore(
    useShallow((state) => ({
      setInputActive: state.setInputActive,
      listType: state.listType,
      tasks: state.tasks,
      displayedTasks: state.displayedTasks,
      taskDetailsOpen: state.taskDetailsOpen,
      isSearching: state.isSearching,
      searchInput: state.searchInput,
    }))
  );

  const plannedArray: TaskType[][] = [[], [], [], []];
  if (listType.title === "Planned") {
    const filteredTask = displayedTasks[0].filter((task) => task.dueDate);
    if (filteredTask) {
      const sortedFilteredTask = filteredTask.sort((a, b) => {
        const dateA = new Date(a.dueDate.toString()).getTime();
        const dateB = new Date(b.dueDate.toString()).getTime();
        return dateA - dateB;
      });
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dayOfTheWeek = today.getDay();
      const monday = new Date();
      monday.setDate(
        today.getDate() - (dayOfTheWeek === 0 ? 6 : dayOfTheWeek - 1)
      );
      const sunday = new Date();
      sunday.setDate(monday.getDate() + 6);

      sortedFilteredTask.forEach((task) => {
        const taskDate = new Date(task.dueDate.toString());
        console.log("Task Date", taskDate.getTime());
        taskDate.setHours(0, 0, 0, 0);
        console.log("Today", today.getTime());
        if (taskDate.getTime() === today.getTime()) {
          plannedArray[1].push(task);
        } else if (taskDate < monday) {
          plannedArray[0].push(task);
        } else if (taskDate > sunday) {
          plannedArray[3].push(task);
        } else {
          plannedArray[2].push(task);
        }
      });
    }
  }

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
      className={`h-full border rounded-3xl p-10 flex flex-col bg-cover bg-center ${
        taskDetailsOpen ? "rounded-r-none w-[60%]" : "w-[80%]"
      } ${
        displayedTasks[0].length === 0 && displayedTasks[1].length == 0
          ? listType.url
          : listType.secondaryUrl
      } ${isSearching && LIST_CONSTANT[4].secondaryUrl}`}
    >
      {!isSearching && (
        <div
          className={`${
            listType.title === "My Day" || listType.title === "Tasks"
              ? "text-white"
              : listType.textColor
          }
        flex gap-2 items-center text-xl mb-6`}
        >
          <div className={"w-7 h-7"}>{listType.icon}</div>
          {listType.title}
        </div>
      )}
      <div
        className={`flex flex-col grow gap-0.5 overflow-clip overflow-y-auto ${
          !isSearching && "max-h-[80%]"
        }`}
      >
        {isSearching ? (
          <>
            {searchInput &&
              tasks
                .filter((task) =>
                  task.task.toLowerCase().includes(searchInput.toLowerCase())
                )
                .map((task, index) => {
                  return (
                    <div key={`${index}${task.createdAt}`}>
                      <Task task={task} />
                    </div>
                  );
                })}
          </>
        ) : (
          <>
            {displayedTasks && listType.title === "Planned"
              ? plannedArray.map((plannedTask, plannedIndex) => {
                  return plannedTask.map((task, index) => {
                    return (
                      <>
                        {plannedIndex === 0 && index < 1 && <div>Earlier</div>}
                        {plannedIndex === 1 && index < 1 && <div>Today</div>}
                        {plannedIndex === 2 && index < 1 && (
                          <div>This Week</div>
                        )}
                        {plannedIndex === 3 && index < 1 && <div>Later</div>}
                        <div key={`${index}${task.createdAt}`}>
                          <Task task={task} />
                        </div>
                      </>
                    );
                  });
                })
              : displayedTasks[0]?.map((task, index) => {
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
          </>
        )}
      </div>
      {!isSearching && (
        <div ref={containerRef} className="mt-auto">
          <TaskInput />
        </div>
      )}
    </div>
  );
};

export { ListItem };
