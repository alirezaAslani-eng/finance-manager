
const identifyDate = (val: unknown): Date | null => {
  if (typeof val === "string" && val.length) {
    // * Check Date ==== >
    const date = new Date(val);
    let identifiedDate: Date | null = isNaN(date.getTime()) ? null : date;
    if (!identifiedDate) return null;
    return identifiedDate;
  }
  return null;
};

export default identifyDate;
