import "colors";
const mongooes = require("mongoose");
const conect = async (
  url: string = "mongodb://localhost:27017/Finance_manger"
): Promise<void> => {
  // * define state =============== >
  let conectState = 0;
  conectState = mongooes.connections[0].readyState;

  // * check state =================>
  if (conectState) return; //  <<<<< Conected

  // * start to conect ====================== >
  const con = await mongooes.connect(url);
  console.log("MongoDb is conected successfully".green);
};
export default conect;
