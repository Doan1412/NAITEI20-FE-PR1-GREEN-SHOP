import { create } from "zustand"

interface ILoadingState {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const useLoadingStore = create<ILoadingState>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}))
