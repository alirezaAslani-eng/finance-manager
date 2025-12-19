import {
  ClientSession,
  Model,
  SchemaDefinitionProperty,
  Types,
} from "mongoose";

interface Options {
  /**
   * check existing of this model
   */
  model: Model<any>;
  /**
   * parameters to check existing
   */
  _id: string | SchemaDefinitionProperty<Types.ObjectId>;
  /**
   * this will be the error message, if autoError is true
   */
  errorText?: string;
  /**
   * passe it, if checking process needs session
   */
  session?: ClientSession;
  /**
   * autoError = true : means this method eather throw error or return the finded mongo document
   * and false means it eather returns null or mongo ducument
   */
  autoError?: boolean;
}

interface TrueAutoErrorOverloadProps extends Options {
  autoError: true;
}
interface FalseAutoErrorOverloadProps extends Options {
  autoError?: false;
}

export type {
  TrueAutoErrorOverloadProps,
  FalseAutoErrorOverloadProps,
  Options,
};
