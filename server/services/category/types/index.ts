// * createCategory.ts  ==== >
interface CreateCategoryInputService {
  name: string;
  user: string;
}
type CreatedCategoryOutputService = CreateCategoryInputService & {
  _id: string;
};

type CreateCategory = (
  info: CreateCategoryInputService
) => Promise<CreatedCategoryOutputService>;

// * isUniqCategory.ts === >
type IsUniqCategory = (
  userID: string,
  categoryName: string
) => Promise<boolean>;

// * editCategory.ts === >
type EditCategory = (
  _id: string,
  updatedInfo: CreateCategoryInputService
) => Promise<CreatedCategoryOutputService>;

// * removeCategory.ts === >
type RemoveCategory = (_id: string) => Promise<void>;

export type {
  // * createCategory.ts  ==== >
  CreateCategory,
  CreatedCategoryOutputService,
  // * isUniqCategory.ts === >
  IsUniqCategory,
  // * editCategory.ts === >
  EditCategory,
  // * removeCategory.ts === >
  RemoveCategory,
};
