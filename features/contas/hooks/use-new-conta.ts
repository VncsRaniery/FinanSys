import { create } from "zustand";

type NewContaState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewConta = create<NewContaState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
