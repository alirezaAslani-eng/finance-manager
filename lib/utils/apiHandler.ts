import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
// ! Dependencies >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
import { ZodError } from "zod";
import mongoose from "mongoose";
import ResponseError from "./ResponseError";
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
        return res.status(400).json(
          new ResponseError({
            message: err.issues,
            type: "Validation",
          })
        );
      }
      // ! ApiError ->
      if (err instanceof ApiError) {
        const { statusCode } = err;
        return res.status(statusCode).json(err.message);
      }
      // ! dataBaseError
      if (err instanceof mongoose.Error.CastError) {
        // ! Invalid Types
        return res
          .status(400)
          .json(
            new ResponseError({ message: err.message, type: "Invalid_type" })
          );
      }
      if (err instanceof mongoose.Error.ValidationError) {
        // ! Invalid Value
        return res
          .status(400)
          .json(
            new ResponseError({ message: err.message, type: "Validation" })
          );
      }
      if (
        err instanceof mongoose.Error ||
        err instanceof mongoose.Error.MongooseServerSelectionError
      ) {
        // ! Network Error
        return res
          .status(503)
          .json(new ResponseError({ message: err.message, type: "Network" }));
      } else {
        // ! Unknown Error
        console.log(err);
        return res
          .status(500)
          .json(new ResponseError({ message: err, type: "Unknown_error" }));
      }
    }
  };
  return wrrapedHandler;
};

export default apiHandler;
