import { otp_model, otp_schema, user_model, user_schema } from "@/model";
import type { InferSchemaType } from "mongoose";
import { sendVerifySMS, throwError, verifyPass } from "../utils";
import { conect } from "../db";
import { userDoc_type } from "@/types/user.types";
import { getReamingTime } from "@/utils";
type OtpType = InferSchemaType<typeof otp_schema>;
type OtpTypeToUpdate = Pick<
  OtpType,
  "expTime" | "limitWait" | "otpCode" | "requestCount"
>;
type verifyReturnType = Omit<InferSchemaType<typeof user_schema>, "password"> &
  userDoc_type;
const otpServices = {
  /** this method only return limitWate which is a date as (ms) that user shoud wait until the end of it .
   * it also handle all of the validations for otp request */
  async requestOtp({ phone }: Pick<OtpType, "phone">): Promise<number> {
    await conect();




    // * Check if dose user exist on database with this phone ====================== >
    const user = await user_model.findOne({ phone });
    throwError(!user, {
      message: "این شماره تماس ثبت نشده",
      statusCode: 404,
      type: "client",
    }); // ! Might throw Error ========== <




    // * Check if dose otp exist on database for this phone ====================== >
    const findedOtp = await otp_model.findOne({ phone, type: "signin" } as Pick<
      OtpType,
      "type"
    >);




    // * if there is no otp on database for this phone ======================= >
    if (!findedOtp) {
      // * Initialize an otp ==================== >
      const otpCode = await sendVerifySMS(phone); // * Generate otp code <<<<
      const createdOtp = await otp_model.create({
        type: "signin",
        attempts: 0,
        // TODO delay => expTime and limitWait is generated as 60000 or 300000 but in response they're 59... and 299...
        expTime: getFutureTime({ isExpTime: true }),
        limitWait: getFutureTime({ isLimitWait: true }),
        otpCode,
        phone,
        requestCount: 1,
        blockTime: 0,
      } as OtpType);
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
      message: `به دلیل درخواست زیاد بعد از ${getReamingTime(
        findedOtp.limitWait
      )} میتونید دوباره درخواست بدید`,
      statusCode: 429,
      type: "client",
    }); // ! Might throw Error ========== <




    // * Check if user has reached maximum requestes >>>
    const maxOtpRequest = Number(process.env.maxOtpRequest);
    if (findedOtp.requestCount == maxOtpRequest) {
      const limitWait = await updateOtpPass(true);
      // * reset request count ================ >
      await otp_model.findOneAndUpdate({ phone }, { requestCount: 0 } as Pick<
        OtpTypeToUpdate,
        "requestCount"
      >);
      return limitWait;
    }



    // * user still have chance to request >>
    const limitWait = await updateOtpPass();
    return limitWait; // * return limitWait <<<


    
    async function updateOtpPass(
      isReachedMaximumRequest: boolean = false
    ): Promise<number> {
      // * Check if user still have chances to request >>
      const otpCode = await sendVerifySMS(phone); // * Generate otp code <<<<

      const updatedOtp = await otp_model.findOneAndUpdate(
        { phone, type: "signin" } as Pick<OtpType, "type">,
        {
          $inc: {
            requestCount: 1,
          },
          expTime: getFutureTime({ isExpTime: true }),
          otpCode,
          limitWait: isReachedMaximumRequest
            ? // TODO delay => expTime and limitWait is generated as 60000 or 300000 but in response they're 59... and 299...
              getFutureTime({ isLimitWait: true, limitMin: 5 })
            : getFutureTime({ isLimitWait: true }),
        },
        { new: true }
      );
      return updatedOtp.limitWait; // * return limitWait <<<
    }
  },
/** 
 * verify user by diffing otp code that user sent us with 
 * an otp document that saved in database and checking user's phone
 */
  async verifyOtp(phone: string, otpCode: string): Promise<verifyReturnType> {
    await conect();




    // * Check if dose otp exist for this phone number ============================ >
    const findedOtp = await otp_model.findOne({ phone, type: "signin" } as Pick<
      OtpType,
      "type"
    >);
    throwError(!findedOtp, {
      message: "شماره تماسی  معتبر نیست",
      statusCode: 403,
      type: "client",
    }); // ! Might Throw Error ======================== <





    // * Check if user is blocked ====================== >
    const now = new Date().getTime();
    throwError(now < findedOtp.blockTime, {
      message: `لطفا ${getReamingTime(
        findedOtp.blockTime
      )} بعد دوباره امتحان کنید`,
      statusCode: 423,
      type: "client",
    }); // ! Might Throw Error ======================== <




    // * Check Attempts of invalid otp code And Block User for a few minutes ======================== >
    if (findedOtp.attempts == process.env.maxInvalidOtp) {
      await otp_model.findOneAndUpdate(
        {
          type: "signin",
          phone,
        } as Pick<OtpType, "type">,
        {
          attempts: 0,
          blockTime: getFutureTime({ isBlockTime: true }),
          expTime: 0,
        } as Pick<OtpType, "attempts" | "blockTime" | "expTime">
      );
      throwError(true, {
        message: `رمز بیش از حد اشتباه وارد شده لطفا ${getReamingTime(
          findedOtp.blockTime
        )} بعد تلاش کنید`,
        statusCode: 429,
        type: "client",
      }); // ! Might Throw Error ======================== <
    }





    // * Verify otp password  ========================================= >
    const isCorrectPass = await verifyPass(otpCode, findedOtp.otpCode);




    // * Check otp and Pluse one attempts if it's wrong =================================== >
    if (!isCorrectPass) {
      await otp_model.findOneAndUpdate(
        { phone, type: "signin" } as Pick<OtpType, "type">,
        {
          $inc: { attempts: 1 } as Pick<OtpType, "attempts">,
        }
      );
      throwError(true, {
        message: "کد اشتباه است",
        statusCode: 401,
        type: "client",
      }); // ! Might Throw Error ======================== <
    }






    // * Check ExpTime of otp ===================== >
    throwError(now > findedOtp.expTime, {
      message: "مدت زمان اعتبار رمز به پایان رسیده",
      statusCode: 410,
      type: "client",
    }); // ! Might Throw Error ======================== <



    

    // * Return User Info ====================== >
    const user = await user_model.findOne({ phone }, undefined, {
      select: "-password -__v",
    });
    return user;
  },
};

export default otpServices;

interface getFutureTimeOption {
  isExpTime?: boolean;
  isLimitWait?: boolean;
  limitMin?: number;
  isBlockTime?: boolean;
}

function getFutureTime({
  isLimitWait,
  isExpTime,
  isBlockTime,
  limitMin = 1,
}: getFutureTimeOption): number {
  // * Expire time ===================================== >
  const date = new Date();
  if (isExpTime) {
    // * 5 minutes to expire
    return date.getTime() + 60000 * 5;
  }
  if (isLimitWait) {
    // * 1 minute to stop limiting
    return date.getTime() + 60000 * limitMin;
  }
  if (isBlockTime) {
    // * 10 minutes for blocking
    return date.getTime() + 60000 * 10;
  }
  return 0;
}
