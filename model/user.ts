import { userRule } from "@/lib/validations/rules";
import { User_face } from "@/types/user.types";
import m, { model, models, Schema } from "mongoose";

const schema = new Schema(userRule, { timestamps: true });

const user_model = models.User || model<User_face>("User", schema);

export default user_model;
