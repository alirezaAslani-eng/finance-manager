import { User_face } from "@/types/user.types";
import { schema_model } from "@/types/utils";

const userRule: schema_model<User_face> = {
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
  },
  password: {
    type: String,
    required: true,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
  },
  phone: {
    type: String,
    match: /^09[0-9]{9}$/,
  },
};

export default userRule;
