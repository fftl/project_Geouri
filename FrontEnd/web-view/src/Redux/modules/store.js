import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
});
