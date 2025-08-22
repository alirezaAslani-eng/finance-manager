import { User_face } from "@/types/user.types";
import m, { model, models, Schema } from "mongoose";


const user_schema = new Schema<User_face>(
  {
    fullName: {
      type: String,
      required: true,
      match: /^[A-Za-zآ-ی]+$/,
      minlength: 5,
      maxlength: 20,
    },
    userName: {
      type: String,
      required: true,
      match: /^[A-Za-zآ-ی0-9_.]+$/,
      minlength: 5,
      maxlength: 30,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      match: /^09[0-9]{9}$/,
      index: true,
      required: true,
    },
  },
  { timestamps: true }
);

const user_model = models.User || model<User_face>("User", user_schema);

export { user_schema, user_model };
