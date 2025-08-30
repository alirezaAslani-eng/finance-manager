import { category_schema, category_model } from "@/model";
import { conect } from "../db";
import type { InferSchemaType } from "mongoose";
import { clientError } from "../utils";

// * Category Schema typpe ============== >
type Category_type = InferSchemaType<typeof category_schema>;
const categoryServivces = {
  async createCategory(categoryInfo: Category_type) {
    const { name, user } = categoryInfo;
    await conect();

    // * CategoryName must be unique ============== >
    const isUnique = await categoryServivces.isUniqueCategoryName(
      user as string,
      name
    );
    clientError("این دسته بندی قبلا ثبت شده", !isUnique, 409); // ! Migth Throw Error ============== <

    // * Create Query ======================= >
    const create_res = await category_model.create({
      ...categoryInfo,
      name: name.trim(),
    });
    return create_res;
  },

  async removeCategory(_id: any) {
    await conect();
    const dl_res = await category_model.findOneAndDelete({ _id });
    clientError("دسته بندی با این مشخصات وجود ندارد", !dl_res);// ! Migth Throw Error ============== <
    return dl_res;
  },

  async editOneCategory(_id: string, updatedInfo: Category_type) {
    const { name, user } = updatedInfo;
    await conect();

    // * CategoryName must be unique ============== >
    const isUnique = await categoryServivces.isUniqueCategoryName(
      user as string,
      name
    );
    clientError("این دسته بندی قبلا ثبت شده", !isUnique, 409); // ! Migth Throw Error ============== <

    // * Create Query ======================= >
    const update_res = await category_model.findOneAndUpdate(
      {
        _id,
      },
      { ...updatedInfo, name: name.trim() }
    );
    clientError("دسته بندی با این مشخصات وجود ندارد", !update_res); // ! Migth Throw Error ============== <
    return update_res;
  },

  async isUniqueCategoryName(
    userID: string,
    categoryName: string
  ): Promise<boolean> {
    const isUnique = await category_model.findOne({
      user: userID,
      name: categoryName.trim(),
    });
    return !!!isUnique;
  },
};

export default categoryServivces;
