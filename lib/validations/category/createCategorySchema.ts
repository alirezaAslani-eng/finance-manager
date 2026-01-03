import { object, string } from "zod";

const createCategorySchema = () => {
  return object({
    name: string().min(2, "حداقل 2 حرف").max(15, "حداکثر 15 حرف "),
  });
};

export default createCategorySchema;
