const authOtpConfig = {
  ExpTime: 60000 * 5,
  WrongAttemptsBlockTime: 60000 * 10,
  ReqsLimitWaitTime: 60000,
  ManyReqsLimitWaitTime: 60000 * 5,
  maxRequestCount: 4,
  maxInvalidOtp: 5,
};

export default authOtpConfig;
