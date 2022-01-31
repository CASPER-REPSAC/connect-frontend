import { PenSVG } from "@/icons";

export const ActivityRowItem = ({
  item,
  icons,
  element,
  expended,
  className,
}) => {
  return (
    <>
      <div className={`max-w-tabletCard ` + className}>
        <div className="flex justify-between items-center h-fit">
          {item && <h2 className=" font-bold m-1">{item.type}</h2>}
          {icons && (
            <div className="flex gap-1">
              <span className="a-char-button text-xs leading-5 ">
                <PenSVG />
              </span>
              <span className="a-char-button leading-5 text-xl ">+</span>
            </div>
          )}
        </div>
        <span className="h-fit">{element && element}</span>
      </div>
    </>
  );
};
export default ActivityRowItem;
