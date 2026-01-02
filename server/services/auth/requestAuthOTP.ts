import { conect } from "@/server/db";
import { OTP, RequestAuthOTP } from "./types";
import { otp_model, user_model } from "@/model";
import { sendCodeSMS, throwError } from "@/server/utils";
import { getReamingTime } from "@/utils";
import { authOtpConfig } from "@/lib/constant";

/** this method only return limitWate which is a date as (ms) that user shoud wait until the end of it .
 * it also handle all of the validations for otp request */
const requestAuthOTP: RequestAuthOTP = async ({ phone, type = "signin" }) => {
  await conect();

  if (type == "signin") {
    // * Check if dose user exist on database with this phone ====================== >
    const user = await user_model.findOne({ phone });
    throwError(!user, {
      message: "این شماره تماس ثبت نشده",
      statusCode: 404,
      type: "client",
    }); // ! Might throw Error ========== <
  }

  // * Check if dose otp exist on database for this phone ====================== >
  const findedOtp = await otp_model.findOne({ phone, type });

  // * if there is no otp on database for this phone ======================= >
  if (!findedOtp) {
    // * Initialize an otp ==================== >
    const otpCode = (await sendCodeSMS(phone)) as string; // ! Might Throw Error ==== <<
    const createdOtp = await otp_model.create({
      type,
      attempts: 0,
      expTime: new Date().getTime() + authOtpConfig.ExpTime,
      limitWait: new Date().getTime() + authOtpConfig.ReqsLimitWaitTime,
      otpCode,
      phone,
      requestCount: 1,
      blockTime: 0,
    } satisfies OTP);
    return createdOtp.limitWait; // * return limitWait <<<<
  }

  // * if we alredy have an otp for this phone ========================== >
  const now = new Date().getTime();
  // * Check if user is blocked  >>>
  throwError(now < findedOtp.blockTime, {
    message: `به دلیل ورود رمز اشتباه بیش از هد مجاز باید بعد از${getReamingTime(
      findedOtp.blockTime as number
    )} درخواست بدید`,
    statusCode: 423,
    type: "client",
  }); // ! Might throw Error ========== <

  // * Check LimitWait >>>
  throwError(now < findedOtp.limitWait, {
    message: findedOtp.limitWait,
    statusCode: 429,
    type: "dev",
  }); // ! Might throw Error ========== <

  // * Check if user has reached maximum requestes >>>
  if (findedOtp.requestCount == authOtpConfig.maxRequestCount) {
    const limitWait = await updateOtpPass(true);
    // * reset request count ================ >
    await otp_model.findOneAndUpdate(
      { phone, type },
      {
        requestCount: 0,
      }
    );
    return limitWait; // * return limitWait <<<
  }

  // * user still have chance to request >>
  const limitWait = await updateOtpPass();
  return limitWait; // * return limitWait <<<

  async function updateOtpPass(
    isReachedMaximumRequest: boolean = false
  ): Promise<number> {
    // * Check if user still have chances to request >>
    const otpCode = await sendCodeSMS(phone); // * Generate otp code <<<<

    const updatedOtp = await otp_model.findOneAndUpdate(
      { phone, type },
      {
        $inc: {
          requestCount: 1,
        },
        expTime: new Date().getTime() + authOtpConfig.ExpTime,
        otpCode,
        limitWait: isReachedMaximumRequest
          ? new Date().getTime() + authOtpConfig.ManyReqsLimitWaitTime
          : new Date().getTime() + authOtpConfig.ReqsLimitWaitTime,
      },
      { new: true }
    );
    return updatedOtp.limitWait; // * return limitWait <<<
  }
};

export default requestAuthOTP;
