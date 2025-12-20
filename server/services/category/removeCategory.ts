import { category_model } from "@/model";
import { RemoveCategory } from "./types";
import { conect } from "@/server/db";

const removeCategory: RemoveCategory = async (_id) => {
  await conect();
  const dl_res = await category_model.findOneAndDelete({ _id });
};

export default removeCategory;
