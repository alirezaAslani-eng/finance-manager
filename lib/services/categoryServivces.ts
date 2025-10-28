import { category_schema, category_model } from "@/model";
import { conect } from "../db";
import type { InferSchemaType } from "mongoose";
import { throwError, payloadToken } from "../utils";
import { NextApiRequest } from "next";
import { PayloadToken_type } from "@/types/user.types";

// * Category Schema type ============== >
type Category_type = InferSchemaType<typeof category_schema>;
type CreatedCategory = Category_type & { _id: string };
const categoryServivces = {
  async createCategory(categoryInfo: Category_type): Promise<CreatedCategory> {
    const { name, user } = categoryInfo;
    await conect();

    // * CategoryName must be unique ============== >
    const isUnique = await categoryServivces.isUniqueCategoryName(
      user as string,
      name
    );

    throwError(!isUnique, {
      message: "این دسته بندی قبلا ثبت شده",
      statusCode: 409,
      type: "client",
    });

    // * Create Query ======================= >
    const create_res = await category_model.create({
      ...categoryInfo,
      name: name.trim(),
    });
    return create_res as CreatedCategory;
  },

  async removeCategory(_id: any) {
    await conect();
    const dl_res = await category_model.findOneAndDelete({ _id });
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

    throwError(!isUnique, {
      message: "این دسته بندی قبلا ثبت شده",
      statusCode: 409,
      type: "client",
    });

    // * Update Query ======================= >
    const update_res = await category_model.findOneAndUpdate(
      {
        _id,
      },
      { ...updatedInfo, name: name.trim() }
    );
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
