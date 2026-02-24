import { createContext } from "react";

export const LecturesContext = createContext({
  lectures: [],
  setLectures: () => {},
});
