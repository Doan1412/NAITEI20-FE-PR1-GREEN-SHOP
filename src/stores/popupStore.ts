import { create } from "zustand"

interface IPopupStore {
  isShowPopup: boolean;
  setIsShowPopup: (isShowPopup: boolean) => void
}

export const usePopupStore = create<IPopupStore>()((set) => ({
  isShowPopup: true,
  setIsShowPopup: (isShowPopup: boolean) => set(() => ({ isShowPopup })),
}))
