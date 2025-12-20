import { category_model } from "@/model";
import { IsUniqCategory } from "./types";

const isUniqCategory: IsUniqCategory = async (userID, categoryName) => {
  const isUnique = await category_model.findOne({
    user: userID,
    name: categoryName.trim(),
  });
  return !!!isUnique;
};

export default isUniqCategory;
