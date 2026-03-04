const formatBankNumber = (banckNumber: string) => {
  return banckNumber
    .replace(/(.{4})(?=.)/g, "$1-")
    .split("-")
    .reverse()
    .join("-");
};

export default formatBankNumber;
