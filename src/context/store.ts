import { create } from "zustand";
import { TaskType, UserType } from "../../backend/src/models";
import { LIST_CONSTANT, listConstantType } from "../constant";

type StoreType = {
  user: UserType | null;
  setUser: (user: UserType) => void;
  tasks: TaskType[];
  setTasks: (task: TaskType[]) => void;
  displayedTasks: TaskType[][];
  updateDisplayTasks: (tasks: TaskType[]) => void;
  taskSelected: TaskType | null;
  setTaskSelected: (task: TaskType | null) => void;
  taskDetailsOpen: boolean;
  setTaskDetailsOpen: (open: boolean) => void;
  listType: listConstantType;
  setListType: (list: listConstantType) => void;
  isInputActive: boolean;
  setInputActive: (active: boolean) => void;
};

const useStore = create<StoreType>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  displayedTasks: [[], []],
  updateDisplayTasks: (tasks) =>
    set((state) => {
      console.log("From the store", tasks);
      const { listType } = state;
      let filteredTasks: TaskType[][] = [];

      switch (listType) {
        case LIST_CONSTANT[0]:
          filteredTasks = [
            tasks.filter((task) => task.myDay && !task.completed),
            tasks.filter((task) => task.myDay && task.completed),
          ];
          break;
        case LIST_CONSTANT[1]:
          filteredTasks = [
            tasks.filter((task) => task.important && !task.completed),
            tasks.filter((task) => task.important && task.completed),
          ];
          break;
        case LIST_CONSTANT[2]:
          filteredTasks = [
            tasks.filter((task) => task.dueDate && !task.completed),
            tasks.filter((task) => task.dueDate && task.completed),
          ];
          break;
        case LIST_CONSTANT[3]:
          filteredTasks = [
            tasks.filter((task) => task.dueDate && !task.completed),
            tasks.filter((task) => task.dueDate && task.completed),
          ];
          break;
        case LIST_CONSTANT[4]:
          filteredTasks = [
            tasks.filter((task) => !task.completed),
            tasks.filter((task) => task.completed),
          ];
          break;
        default:
          break;
      }
      return { displayedTasks: filteredTasks }; // Update displayedTasks
    }),
  listType: LIST_CONSTANT[0],
  setListType: (list) => set({ listType: list }),
  isInputActive: false,
  setInputActive: (active) => set({ isInputActive: active }),
  taskSelected: null,
  setTaskSelected: (task) => set({ taskSelected: task }),
  taskDetailsOpen: false,
  setTaskDetailsOpen: (open) => set({ taskDetailsOpen: open }),
}));

export { useStore };
