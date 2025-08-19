import { ApiError } from "next/dist/server/api-utils";

export default function defultError(msg: string) {
  throw new ApiError(400, msg);
}
