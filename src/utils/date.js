export const formatDateToYYYYMMDD = (date) => {
  return date.toISOString().split('T')[0];
};
