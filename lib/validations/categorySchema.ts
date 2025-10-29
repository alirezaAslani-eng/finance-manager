import { Infer, object, string } from "zod";

const categorySchema = object({
  name: string().min(2, "حداقل 2 حرف").max(15, "حداکثر 15 حرف "),
});

const categoryEditSchema = categorySchema.pick({ name: true });

type CategorySchemaType = Infer<typeof categorySchema>;

type CategoryEditSchemaType = Infer<typeof categorySchema>;

export type { CategorySchemaType, CategoryEditSchemaType };
export { categorySchema, categoryEditSchema };
