import {ReactNode} from "react";

export interface IMenu {
  id: number;
  title: string;
  icon: ReactNode;
  link: string;
}
