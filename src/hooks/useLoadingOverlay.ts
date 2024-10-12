import { create } from "zustand";

const useLoadingOverlay = create<TState>()((set) => ({
  opened: false,
  show: () => set({ opened: true }),
  close: () => set({ opened: false }),
}));

export default useLoadingOverlay;

type TState = {
  opened: boolean;
  show: () => void;
  close: () => void;
};
