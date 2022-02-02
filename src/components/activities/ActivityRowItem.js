import { PenSVG } from "@/icons";
import { ActivityCardList } from "./ActivityCardList";
import { isArray } from "#serv";

const classNames = {
  end_first:
    "col-start-[-1] col-end-[-2] row-start-[-3] row-end-[-4] max-w-tabletCard",
  end_second:
    "col-start-[-1] col-end-[-2] row-start-[-2] row-end-[-3] max-w-tabletCard",
  end_third:
    "col-start-[-1] col-end-[-2] row-start-[-1] row-end-[-2] max-w-tabletCard",

  main: "col-start-2 col-end-2 row-start-1 row-end-4 w-full",

  start_first:
    "col-start-1 col-end-2 row-start-[-3] row-end-[-4] max-w-tabletCard",
  start_second:
    "col-start-1 col-end-2 row-start-[-3] row-end-[-4] max-w-tabletCard",
};

export const ActivityRowItem = ({
  type,
  icons,
  children,
  expended,
  activities,
  gridPosition,
}) => {
  const className = classNames[gridPosition || "end_first"];
  return (
    <>
      <div className={className}>
        <div className="flex justify-between items-center h-fit">
          {isArray(activities) && type && (
            <>
              <h2 className=" font-bold m-1">{type}</h2>
              {icons && (
                <div className="flex gap-1">
                  <span className="a-char-button text-xs leading-5 ">
                    <PenSVG />
                  </span>
                  <span className="a-char-button leading-5 text-xl ">+</span>
                </div>
              )}
            </>
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
          {!activities && children}
        </span>
      </div>
    </>
  );
};
export default ActivityRowItem;
