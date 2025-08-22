import { category_schema, category_model } from "@/model";
import { conect } from "../db";
import type { InferSchemaType } from "mongoose";

// * Category Schema typpe ============== >
type Category_type = InferSchemaType<typeof category_schema>;
const categoryServivces = {
  async createCategory(categoryInfo: Category_type) {
    await conect();
    const create_res = await category_model.create(categoryInfo);
    return create_res;
  },
  async removeCategory(_id: any) {
    await conect();
    const dl_res = await category_model.findOneAndDelete({ _id });
    return dl_res;
  },
  async getCategories() {
    const get_res = await category_model.find();
    return get_res;
  },
};

export default categoryServivces;
