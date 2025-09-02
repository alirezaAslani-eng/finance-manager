import BadResponse from "./BadResponse";
import { BadResponse_face } from "@/types/error.types";

export default function defultError(
  isError: boolean,
  badRes: BadResponse_face
) {
  if (isError) {
    throw new BadResponse(badRes);
  }
  return;
}
