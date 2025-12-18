import { BadResponse_face } from "@/types/error.types";

class BadResponse implements BadResponse_face {
  devMessage: unknown;
  message: string;
  statusCode: number;
  type: BadResponse_face["type"];
  constructor({ devMessage, message, statusCode, type }: BadResponse_face) {
    this.message = message;
    this.statusCode = statusCode;
    this.devMessage = devMessage;
    this.type = type;
  }
}

export default BadResponse;
