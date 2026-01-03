import { object, string } from "zod";

const activeAccountSchema = () => {
  return object({
    _id: string("لطفا شناسه حسابی که میخواهید فعال کنید بدهید"),
  });
};

export default activeAccountSchema;
