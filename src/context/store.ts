import { create } from "zustand";
import { TaskType, UserType } from "../../backend/src/models";
import { LIST_CONSTANT, listConstantType } from "../constant";

type StoreType = {
  user: UserType | null;
  setUser: (user: UserType) => void;
  tasks: TaskType[];
  setTasks: (task: TaskType[]) => void;
  displayedTasks: TaskType[][] | null;
  setDisplayedTasks: (task: TaskType[][]) => void;
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
  displayedTasks: null,
  setDisplayedTasks: (displayedTasks) => set({ displayedTasks }),
  listType: LIST_CONSTANT[0],
  setListType: (list) => set({ listType: list }),
  isInputActive: false,
  setInputActive: (active) => set({ isInputActive: active }),
}));

export { useStore };
