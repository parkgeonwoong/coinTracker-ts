/**
 * @desc : Recoil 상태(atom) 파일
 */

import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});
