import "colors";
import  mongooes  from "mongoose"
const conect = async (
  url: string | undefined = process.env.db_address
): Promise<void> => {
  // * define state =============== >
  let conectState = 0;
  conectState = mongooes.connections[0].readyState;

  // * check state =================>
  if (conectState) return; //  <<<<< Conected

  // * start to conect ====================== >
  const con = await mongooes.connect(url || "");
  console.log("MongoDb is conected successfully".green);
};
export default conect;
