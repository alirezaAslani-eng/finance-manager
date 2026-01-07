const faNumToEnNum = (fa_number: string) =>
  fa_number.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

export default faNumToEnNum;
