export const CUDActionTypeCreator = (type) => {
  const CUD = ["CREATE", "UPDATE", "DELETE"];
  let rst = [];
  CUD.map((v) => {
    rst = rst.concat([
      `submits/${type}_${v}`,
      `submits/${type}_${v}_SUCCESS`,
      `submit/${type}_${v}_FAIL`,
    ]);
  });
  return rst;
};
