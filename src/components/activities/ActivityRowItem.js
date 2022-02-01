import { PenSVG } from "@/icons";
import { ActivityCardList } from "./ActivityCardList";

const classNames = {
  detail: {
    first:
      "lg:col-start-1 lg:col-end-2 col-start-2 col-end-3 row-start-1 lg:row-end-4 row-end-2",
    second:
      "lg:col-start-3 col-start-2 lg:col-end-4 col-end-3 lg:row-start-1 lg:row-end-2 row-start-2 row-end-3",
    third:
      "lg:col-start-3 col-start-2 lg:col-end-4 col-end-3 lg:row-start-2 lg:row-end-3 row-start-3 row-end-4",
    main: "mt-2 col-start-1 col-end-2 lg:col-start-2 lg:col-end-3 row-start-1 row-end-5 justify-self-stretch min-w-full h-fit",
    info: "mt-2 lg:col-start-3 lg:col-end-4 col-start-2 col-end-3 row-start-1 row-end-2",
  },
  home: {
    first:
      "lg:col-start-1 lg:col-end-2 col-start-2 col-end-3 lg:row-start-1 lg:row-end-4 row-start-2 row-end-3",
    second:
      "lg:col-start-3 col-start-2 lg:col-end-4 col-end-3 lg:row-start-2 lg:row-end-3 row-start-3 row-end-4",
    third:
      "lg:col-start-3 col-start-2 lg:col-end-4 col-end-3 lg:row-start-3 lg:row-end-4 row-start-4 row-end-5",

    main: "mt-2 col-start-1 col-end-2 lg:col-start-2 lg:col-end-3 row-start-1 row-end-5 justify-self-stretch min-w-full h-fit",
  },
};

export const ActivityRowItem = ({
  type,
  icons,
  element,
  expended,
  activities,
  page,
  priority,
}) => {
  const className = classNames[page || "home"][priority || "first"];
  return (
    <>
      <div className={`max-w-tabletCard ` + className}>
        <div className="flex justify-between items-center h-fit">
          {type && <h2 className=" font-bold m-1">{type}</h2>}
          {icons && (
            <div className="flex gap-1">
              <span className="a-char-button text-xs leading-5 ">
                <PenSVG />
              </span>
              <span className="a-char-button leading-5 text-xl ">+</span>
            </div>
          )}
        </div>
        <span className="h-fit">
          {activities && (
            <ActivityCardList
              activities={activities.filter(
                (activity) => activity.type === type
              )}
            />
          )}
          {!activities && element}
        </span>
      </div>
    </>
  );
};
export default ActivityRowItem;
