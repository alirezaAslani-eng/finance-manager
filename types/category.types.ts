import { User_face } from "./user.types";

interface Category_face {
  name: string;
  user: User_face;
}

interface Category {
  name: string;
  user: string;
}

export type { Category_face, Category };
