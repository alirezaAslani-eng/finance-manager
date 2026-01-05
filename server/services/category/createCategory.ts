import { conect } from "@/server/db";
import { CreateCategory, CreatedCategoryOutputService } from "./types";
import { throwError } from "@/server/utils";
import { isUniqCategory } from "@/server/services";
import { category_model } from "@/server/models";

const createCategory: CreateCategory = async ({ name, user }) => {
  await conect();

  // * CategoryName must be unique ============== >
  const isUnique = await isUniqCategory(user as string, name);

  throwError(!isUnique, {
    message: "این دسته بندی قبلا ثبت شده",
    statusCode: 409,
    type: "client",
  });

  // * Create Query ======================= >
  const create_res = await category_model.create({
    user,
    name: name.trim(),
  });
  return create_res as CreatedCategoryOutputService;
};

export default createCategory;
