import {
  User_face,
  UserRoles,
  UserRolesForMongoEnum,
} from "@/types/user.types";
import m, { model, models, Schema } from "mongoose";
import { category_model } from "./category"; // * Relation
import { account_model } from "./account"; // * Relation
// * phone, email, userName are uniqued <<<<<<<<<<
const user_schema = new Schema<User_face>(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
    },
    userName: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Za-z0-9._%+-]+@gmail\.com$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      match: /^09[0-9]{9}$/,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"] satisfies UserRolesForMongoEnum,
      default: "USER" satisfies UserRoles,
    },
  },
  { timestamps: true },
);
user_schema.set("toObject", { virtuals: true });
user_schema.set("toJSON", { virtuals: true });
// * Virtual ==================== >
user_schema.virtual("categories", {
  ref: "Category",
  localField: "_id",
  foreignField: "user",
});
user_schema.virtual("accounts", {
  ref: "Account",
  localField: "_id",
  foreignField: "user",
});
const user_model = models.User || model<User_face>("User", user_schema);

export { user_schema, user_model };
