import { category_schema, category_model } from "@/model";
import { conect } from "../db";
import type { InferSchemaType } from "mongoose";
import { throwError, verifyUserToken } from "../utils";
import { NextApiRequest } from "next";
import { PayloadToken_type } from "@/types/user.types";
import {
  CreateCategoryInputService,
  CreatedCategoryReturnService,
} from "./types/services.types";

// * Category Schema type ============== >

const categoryServivces = {
  async createCategory(
    categoryInfo: CreateCategoryInputService
  ): Promise<CreatedCategoryReturnService> {
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
    return create_res as CreatedCategoryReturnService;
  },

  async removeCategory(_id: any) {
    await conect();
    const dl_res = await category_model.findOneAndDelete({ _id });
    return dl_res;
  },

  async editOneCategory(
    _id: string,
    updatedInfo: CreateCategoryInputService
  ): Promise<CreatedCategoryReturnService> {
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
      { $set: { name: name.trim() } },
      { new: true }
    );
    return update_res as CreatedCategoryReturnService;
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
