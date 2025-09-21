import { ReactNode } from "react";

interface MenuItemFace {
  id: string;
  text: string;
  link: string;
  icon: ReactNode;
}
type MenuList = MenuItemFace[];

export type { MenuList, MenuItemFace };
