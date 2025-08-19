import { SchemaDefinitionProperty } from "mongoose";

type Test_type<A, B> = A extends B ? true : false;




// * this util transform each key of an interface or type to a SchemaDefinitionProperty
/* 
*interface User {
*  name:string
*  password:number
*}
? schema_model<User> transform it to : 
* type {
*   name:SchemaDefinitionProperty<string>
*   password:SchemaDefinitionProperty<number>
* }
*/
type schema_model<T> = {
  [key in keyof T]: SchemaDefinitionProperty<T[key]>;
};
export type { Test_type, schema_model };
