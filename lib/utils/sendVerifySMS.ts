import hashPass from "./hashPass";
import throwError from "./throwError";

const sendVerifySMS = async (phone: string): Promise<string | undefined> => {
  // * Generate 5 unique numbers ================== >
  const code = String(Math.floor(10000 + Math.random() * 89999));
  try {
    // * Request to Faraz SMS =========================== >
    const res = await fetch("http://ippanel.com/api/select", {
      method: "POST",
      body: JSON.stringify({
        op: "pattern",
        user: process.env.userSMS,
        pass: process.env.passSMS,
        fromNum: "3000505",
        toNum: phone,
        patternCode: "30e1zxiv2m0fjd6",
        inputData: [{ verifyCode: code }],
      }),
    });
    if (true) {
      const hashedCode = await hashPass(code);
      return hashedCode;
    }
  } catch (err) {
    throwError(true, {
      message: "مشکلی هنگام ارسال کد رخ داده",
      devMessage: err,
      statusCode: 500,
      type: "client",
    });
  }
};

export default sendVerifySMS;
