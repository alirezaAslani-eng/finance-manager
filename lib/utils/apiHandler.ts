// ! Dependencies >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { ZodError } from "zod";
import { MongoNetworkError, MongoServerError } from "mongodb";
import mongoose from "mongoose";
import { ClientError, DevError } from "@/types/error.types";
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
        const error: DevError = {
          message: err.issues,
          type: "validation",
        };
        return res.status(400).json(error);
      }
      // ! ApiError ->
      if (err instanceof ApiError) {
        // * message of Api Errors will be shown to user 
        const { statusCode } = err;
        const error: ClientError = {
          message: err.message,
          type: "client",
        };
        return res.status(statusCode).json(error);
      }
      // ! dataBaseError
      if (err instanceof mongoose.Error.CastError) {
        // ! Invalid Types
        const error: DevError = {
          message: err.message,
          type: "database",
        };
        return res.status(400).json(error);
      }
      if (err instanceof mongoose.Error.ValidationError) {
        // ! Invalid Value
        const error: DevError = {
          message: err.message,
          type: "database",
        };
        return res.status(400).json(error);
      }
      if (err instanceof MongoNetworkError) {
        // ! Network Error
        const netWorkErr: DevError = {
          message: err.message,
          type: "database-network",
        };
        return res.status(503).json(netWorkErr);
      }
      if (err instanceof MongoServerError && err.code == 11000) {
        // ! Dublicate Error / Conflict
        const netWorkErr: DevError = {
          message: err.message,
          type: "database",
        };
        return res.status(400).json(netWorkErr);
      }
      // ! Unknown Error
      const unknownErr: DevError = {
        type: "unknown",
        message: err,
      };
      return res.status(500).json(unknownErr);
    }
  };
  return wrrapedHandler;
};

export default apiHandler;
