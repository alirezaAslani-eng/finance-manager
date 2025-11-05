interface Output {
  formatted: string;
  onlyNumber: string;
}
type CardNumberFormatter = (value: string) => Output;
const cardNumberFormatter: CardNumberFormatter = (value) => {
  const onlyNumber = value.replace(/\D/g, "");
  const formatted = onlyNumber.replace(/(.{4})/g, "$1-").replace(/-$/, "");
  return { formatted, onlyNumber };
};

export default cardNumberFormatter;
