import { ApiError } from "next/dist/server/api-utils";

export default function defultError(
  msg: string,
  isError?: boolean,
  code?: number
) {
  if (isError) {
    throw new ApiError(code || 400, msg);
  }
  return;
}
