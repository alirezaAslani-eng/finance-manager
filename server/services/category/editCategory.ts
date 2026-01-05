import { conect } from "@/server/db";
import { CreatedCategoryOutputService, EditCategory } from "./types";
import { isUniqCategory } from "@/server/services";
import { throwError } from "@/server/utils";
import { category_model } from "@/server/models";

const editCategory: EditCategory = async (_id, info) => {
  const { name, user } = info;
  await conect();

  // * CategoryName must be unique ============== >
  const isUnique = await isUniqCategory(user, name);

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
  return update_res as CreatedCategoryOutputService;
};

export default editCategory;
