import { categoryServivces } from "@/lib/services";
import { apiHandler } from "@/lib/utils";
import { categorySchema } from "@/lib/validations";
import { handler_type } from "@/types/api.types";
import { ApiError } from "next/dist/server/api-utils";

const handler: handler_type = async (req, res) => {
  const { createCategory } = categoryServivces;
  switch (req.method as "POST") {
    case "POST": {
      // TODO -> auth : is it user at all 
      // TODO -> auth : who is creating a category we need to know theme becase each one has their own category list
      const { name } = categorySchema.parse(req.body); // ! Might Throw Error
      const create_res = await createCategory({ name, user: "userId" });
      return res.status(201).json(create_res); // ? RESPONSE <------------
    }
    default: {
      throw new ApiError(400, "request method is not valid");
    }
  }
};

export default apiHandler(handler);
