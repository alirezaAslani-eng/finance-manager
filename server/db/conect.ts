import "colors";
import mongooes from "mongoose";
import type { Connection } from "mongoose";
const conect = async (
  url: string | undefined = process.env.db_local_address
): Promise<Connection> => {
  // * define state =============== >
  let conectState = 0;
  conectState = mongooes.connections[0].readyState;
  mongooes.connection;
  // * check state =================>
  if (conectState) return mongooes.connections[0]; //  <<<<< // * Alredy Conected

  // * start to conect ====================== >
  const con = await mongooes.connect(url || "");
  return con.connection;
  console.log("MongoDb is conected successfully".green);
};
export default conect;
