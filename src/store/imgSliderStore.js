import { create } from "zustand";

const useSliderStore = create((set) => ({
  sliders: {},
  activeSlider: null,
  setActiveSlider: (id) => set({ activeSlider: id }),
  setImageIndex: (id, index) => {
    set((state) => ({
      sliders: { ...state.sliders, [id]: index },
    }));
  },
  resetSliders: (id) => {
    set((state) => {
      const newSliders = { ...state.sliders };
      for (const key in newSliders) {
        newSliders[key] = key === id ? newSliders[key] : 0;
      }
      return { sliders: newSliders };
    });
  },
}));

export default useSliderStore;
