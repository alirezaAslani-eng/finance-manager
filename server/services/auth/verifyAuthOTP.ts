import { conect } from "@/server/db";
import { otp_model, user_model } from "@/model";
import { throwError } from "@/server/utils";
import { VerifyAuthOTP, VerifyAuthOTP_Output } from "./types";
import { getReamingTime } from "@/utils";
import { authOtpConfig } from "@/lib/constant";

/**
 * verify user by diffing otp code that user sent us with
 * an otp-document that saved in database and checking user's phone
 */
const verifyOtp: VerifyAuthOTP = async ({
  otpCode,
  phone,
  type = "signin",
}) => {
  await conect();

  // * Check if dose otp exist for this phone number ============================ >
  const findedOtp = await otp_model.findOne({ phone, type });
  throwError(!findedOtp, {
    message: `درخواست کد برای شماره ${phone} ارسال نشده`,
    statusCode: 401,
    type: "verify",
  }); // ! Might Throw Error ======================== <

  // * Check if user is blocked ====================== >
  const now = new Date().getTime();
  throwError(now < findedOtp.blockTime, {
    message: `شماره ${phone} برای ${getReamingTime(
      findedOtp.blockTime
    )} مسدود شده است`,
    statusCode: 423,
    type: "verify",
  }); // ! Might Throw Error ======================== <

  // * Check Attempts of invalid otp code And Block User for a few minutes ======================== >
  if (findedOtp.attempts == authOtpConfig.maxInvalidOtp) {
    await otp_model.findOneAndUpdate(
      {
        type,
        phone,
      },
      {
        $set: {
          attempts: 0,
          blockTime:
            new Date().getTime() + authOtpConfig.WrongAttemptsBlockTime,
          expTime: 0,
        },
      }
    );
    throwError(true, {
      message: `رمز بیش از حد اشتباه وارد شده لطفا ${getReamingTime(
        findedOtp.blockTime
      )} بعد تلاش کنید`,
      statusCode: 429,
      type: "verify",
    }); // ! Might Throw Error ======================== <
  }

  // * Verify otp password  ========================================= >
  const isCorrectPass = otpCode == findedOtp.otpCode;

  // * Check otp and Pluse one attempts if it's wrong =================================== >
  if (!isCorrectPass) {
    await otp_model.findOneAndUpdate(
      { phone, type },
      {
        $inc: { attempts: 1 },
      }
    );
    throwError(true, {
      message: "کد اشتباه است",
      statusCode: 401,
      type: "verify",
    }); // ! Might Throw Error ======================== <
  }

  // * Check ExpTime of otp ===================== >
  throwError(now > findedOtp.expTime, {
    message: "مدت زمان اعتبار رمز به پایان رسیده",
    statusCode: 410,
    type: "verify",
  }); // ! Might Throw Error ======================== <

  // * Success Verify ====================== >
  const user = await user_model
    .findOne({ phone }, undefined, {
      select: "-password -__v",
    })
    .lean<VerifyAuthOTP_Output>();
  return user as VerifyAuthOTP_Output;
};

export default verifyOtp;
