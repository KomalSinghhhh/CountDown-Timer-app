import { atom } from "recoil";

export const activeTimersState = atom({
  key: "activeTimersState",
  default: [],
});

export const endedTimersState = atom({
  key: "endedTimersState",
  default: [],
});
