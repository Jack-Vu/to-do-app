import { create } from "zustand";
import { UserType } from "../../backend/src/models";

type StoreType = {
  user: UserType | null;
  setUser: (user: UserType) => void;
  isInputActive: boolean;
  setInputActive: (active: boolean) => void;
};

const useStore = create<StoreType>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isInputActive: false,
  setInputActive: (active) => set({ isInputActive: active }),
}));

export { useStore };
