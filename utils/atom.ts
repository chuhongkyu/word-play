import { atom } from "recoil";

const introState = atom({
  key: "introState",
  default: false,
});

const scoreNumberState = atom({
  key: 'scoreNumberState',
  default: 0,
});

export { introState, scoreNumberState };
