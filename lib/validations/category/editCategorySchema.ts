import { object } from "zod";
import createCategorySchema from "./createCategorySchema";

const editCategorySchema = () => {
  return createCategorySchema().pick({ name: true });
};

export default editCategorySchema;
