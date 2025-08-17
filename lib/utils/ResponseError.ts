type Error_types =
  | "DataBase"
  | "Validation"
  | "Network"
  | "UnAuthorized"
  | "Not_Found"
  | "Invalid_type"
  | "Unknown_error";

interface ResponseError_face {
  type: Error_types;
  message: any;
}

interface constructor_props extends ResponseError_face {}
export default class ResponseError implements ResponseError_face {
  message: any;
  type: Error_types;
  constructor({ message, type }: constructor_props) {
    this.message = message;
    this.type = type;
  }
}
