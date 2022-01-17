export function log() {
  if (process.env.NODE_ENV === "production") return;
  for (var i = 0; i < arguments.length; i++) {
    if (i === 0 && typeof arguments[i] == "string") {
      // console.log(arguments[i]);
      console.log(
        `%c ${arguments[i]}`,
        `color: blue; font-size: 14px; font-weight: bold;`
      );
    } else if (i === 1 && typeof arguments[i] == "string") {
      console.log(`%c \t${arguments[i]}`, `font-weight: bold;`);
    } else {
      console.log(arguments[i]);
    }
  }
}

export const isArray = (data) => {
  if (data && Array.isArray(data)) {
    return true;
  }
  return false;
};
