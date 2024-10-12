import { create } from "zustand";

const useLoadingOverlay = create<TState>()((set) => ({
  opened: false,
  show: () => set({ opened: true }),
  close: () => set({ opened: false }),
  setOpenState: (opened) => set({ opened }),
}));

export default useLoadingOverlay;

type TState = {
  opened: boolean;
  show: () => void;
  close: () => void;
  setOpenState: (opened: boolean) => void;
};
