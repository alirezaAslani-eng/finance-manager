import { Category_face } from "@/types/category.types";
import { user_model } from "./user"; // * Relation
import {
  Schema,
  models,
  model,
  SchemaDefinitionProperty,
  Types,
} from "mongoose";

// * overrided types ============== >
type overridedType = { user: SchemaDefinitionProperty<Types.ObjectId> };
// * schema type ==================== >
type schemaType = Omit<Category_face, "user"> & overridedType;

const category_schema = new Schema<schemaType>({
  name: {
    type: String,
    required: true,
    maxlength: 15,
    minlength: 1,
    index: true,
    unique: true,
  },
  user: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const category_model =
  models.Category || model<schemaType>("Category", category_schema);

export { category_model, category_schema };
