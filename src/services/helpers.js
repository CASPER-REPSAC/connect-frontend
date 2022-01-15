export const log = (data) => {
  if (process.env.NODE_ENV === "production") return;
  console.log(data);
};

export const isArray = (data) => {
  if (data && Array.isArray(data)) {
    return true;
  }
  return false;
};
