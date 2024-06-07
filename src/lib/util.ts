export const getCurrencyFormatter = () => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return formatter;
};

export const parseAndValidateId = (id: string | string[] | undefined): number | null => {
  if (!id || Array.isArray(id)) {
    console.error("ID should be a single string, received:", id);
    return null;
  }

  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    console.error("ID is not a valid number:", id);
    return null;
  }

  return numericId;
};
