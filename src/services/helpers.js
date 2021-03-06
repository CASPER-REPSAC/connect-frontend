export function log() {
  if (process.env.NODE_ENV === "production") return;
  for (var i = 0; i < arguments.length; i++) {
    if (i === 0 && typeof arguments[i] == "string") {
      // console.log(
      //   `%c ${arguments[i]}`,
      //   `color: blue; font-size: 14px; font-weight: bold;`
      // );
    } else if (i === 1 && typeof arguments[i] == "string") {
      // console.log(`%c \t${arguments[i]}`, `font-weight: bold;`);
    } else {
      // console.log(arguments[i]);
    }
  }
}

export const isArray = (data) => {
  if (data && Array.isArray(data) && data.length > 0) {
    return true;
  }
  return false;
};

/**
 * @param prevClass
 * @param newClass
 */
export function returnUnionedClassName(prevClass, newClass) {
  if (!newClass) {
    return prevClass;
  }
  const prevClassList = prevClass.split(" ");
  const newClassList = newClass.split(" ");
  let prevClassExcluded = prevClassList;

  for (let i = 0; i < newClassList.length; i++) {
    const property = newClassList[i].split("-")[0];
    for (let j = 0; j < prevClassList.length; j++) {
      if (prevClassList[j].split("-")[0] === property) {
        if (["overflow", "max", "min"].indexOf(property) === -1)
          prevClassExcluded = prevClassExcluded.filter(
            (v) => v !== prevClassList[j]
          );
      }
    }
  }
  return Array.from(new Set(prevClassExcluded.concat(newClass))).join(" ");
}

export function formatDateTimeWithTimeZone(date) {
  return `${date.substr(0, 10)} ${date.substr(11, 8)}`;
}

export function formDateAsFormData(time) {
  return (
    time.getFullYear() +
    "-" +
    `${time.getMonth() + 1}`.padStart(2, "0") +
    "-" +
    `${time.getDate()}`.padStart(2, "0")
  );
}
