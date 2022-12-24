import { atom } from "recoil";

const introState = atom({
  key: "introState",
  default: false,
});

export { introState };
