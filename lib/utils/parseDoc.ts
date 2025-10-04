import { Document } from "mongoose";
const parseDoc = (doc: object | Document) => {
  return JSON.parse(JSON.stringify(doc));
};
export default parseDoc;
