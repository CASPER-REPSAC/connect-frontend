import { PaperPlaneSVG } from "@/icons";

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
