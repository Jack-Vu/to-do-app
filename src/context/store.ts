import { create } from "zustand";
import { UserType } from "../../backend/src/models";
import { LIST_CONSTANT, listConstantType } from "../constant";

type StoreType = {
  listType: listConstantType;
  setListType: (list: listConstantType) => void;
  user: UserType | null;
  setUser: (user: UserType) => void;
  isInputActive: boolean;
  setInputActive: (active: boolean) => void;
};

const useStore = create<StoreType>()((set) => ({
  listType: LIST_CONSTANT[0],
  setListType: (list) => set({ listType: list }),
  user: null,
  setUser: (user) => set({ user }),
  isInputActive: false,
  setInputActive: (active) => set({ isInputActive: active }),
}));

export { useStore };
