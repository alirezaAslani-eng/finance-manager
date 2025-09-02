// ! Dependencies >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import { ZodError } from "zod";
import { MongoError } from "mongodb";
import BadResponse from "./BadResponse";
import type { NextApiRequest, NextApiResponse } from "next";
// ! <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

type handler_type = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

const apiHandler = (handler: handler_type): handler_type => {
  const wrrapedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const handler_res = await handler(req, res);
      return handler_res;
    } catch (err) {
      // ! Vilidation (zod)
      if (err instanceof ZodError) {
        const error = new BadResponse({
          message: "zod error (inout validation)",
          statusCode: 400,
          type: "dev",
          devMessage: err.issues,
        });
        return res.status(400).json(error);
      }
      // ! ApiError ->
      if (err instanceof BadResponse) {
        // * developer throws this type of Error by using function throwError() <<<<
        return res.status(err.statusCode).json(err);
      }
      // ! dataBaseError
      if (err instanceof MongoError) {
        const error = new BadResponse({
          message: "database error",
          statusCode: 500,
          type: "database",
          devMessage: err.message,
        });
        return res.status(error.statusCode).json(error);
      }
      // ! Unknown Error
      const error = new BadResponse({
        message: "database error",
        statusCode: 500,
        type: "unknown",
        devMessage: err,
      });
      return res.status(error.statusCode).json(error);
    }
  };
  return wrrapedHandler;
};

export default apiHandler;
