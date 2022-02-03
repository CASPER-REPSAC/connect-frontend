import { PaperPlaneSVG, CogSVG, PenSVG, PlusSVG } from "@/icons";

export const SubmitButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 h-fit border rounded-2xl bg-point-500 text-text-50 hover:bg-point-600 transition-all  active:bg-point-700 active:rotate-12"
    >
      <PaperPlaneSVG />
    </button>
  );
};

export const PenButton = ({ onClick }) => {
  return (
    <span className="a-char-button ">
      <PenSVG />
    </span>
  );
};
export const PlusButton = ({ onClick }) => {
  return (
    <span className="a-char-button  ">
      <PlusSVG />
    </span>
  );
};
export const CogButton = ({ onClick }) => {
  return (
    <span className="a-char-button  ">
      <CogSVG />
    </span>
  );
};
