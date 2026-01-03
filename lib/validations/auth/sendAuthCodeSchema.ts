import { object, enum as enum_ } from "zod";
import signupSchema from "./signupSchema";

const sendAuthCodeSchema = () => {
  return object({
    phone: signupSchema().shape.phone,
    type: enum_(["signin", "signup"]),
  });
};

export default sendAuthCodeSchema;
