import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    //TODO reducers in the future
    _tmp: (state = {}) => state,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
