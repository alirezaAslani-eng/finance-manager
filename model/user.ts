import { User_face } from "@/types/user.types";
import m, { model, models, Schema } from "mongoose";

const schema = new Schema<User_face>({});

const user_model = models.user || model("User", schema);

export default user_model;
