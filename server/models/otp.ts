import { model, models, Schema } from "mongoose";
import { Otp_face, OtpType_enum } from "@/types/opt.types";

const otp_schema = new Schema<Otp_face>({
  type: {
    type: String,
    enum: Object.values(OtpType_enum),
    required: true,
  },
  expTime: {
    type: Number,
    required: true,
  },
  limitWait: {
    type: Number,
    required: true,
  },
  attempts: {
    type: Number,
    required: true,
    max: 5,
  },
  blockTime: {
    type: Number,
    required: true,
  },
  requestCount: {
    type: Number,
    required: true,
    max: 5,
  },
  otpCode: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const otp_model = models.Otp || model<Otp_face>("Otp", otp_schema);

export { otp_model, otp_schema };
