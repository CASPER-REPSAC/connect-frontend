import React, { useState } from "react";
import {
  PaperPlaneSVG,
  PenToSquareSVG,
  CogSVG,
  PenSVG,
  PlusSVG,
  TrashCanSVG,
} from "@/icons";
import { WithToolTip } from "./ToolTip";

export const SubmitButton = React.memo(({ onClick }) => {
  return (
    <WithToolTip
      tooltip="작성"
      tooltipclassname="px-2 whitespace-nowrap w-fit"
      offsetclass="-top-9 -left-1 after:absolute after:top-7 after:left-2 after:border-transparent after:border-t-background-700"
    >
      <button
        onClick={onClick}
        className=" h-fit mx-2 rounded-2xl text-point-500  hover:text-point-600 transition-all hover:rotate-6 active:text-point-700 active:rotate-12"
      >
        <PaperPlaneSVG />
      </button>
    </WithToolTip>
  );
});

const AskToolTip = ({ msg, msqWord, show, setShow, onQue, className }) => {
  return (
    <>
      {show && (
        <div
          className={
            className ||
            "absolute w-44 h-20  bg-background-50 shadow shadow-background-300 z-30 -translate-x-40 text-sm rounded flex items-center justify-center flex-col gap-2"
          }
        >
          <div>{msg}</div>
          <div>
            <button
              className="px-2 bg-background-200 mr-2 py-1 rounded font-bold hover:bg-background-300 transition-all"
              onClick={() => setShow(false)}
            >
              취소
            </button>
            <button
              className="px-2 bg-point-600 hover:bg-point-700 transition-all py-1 rounded  font-bold text-text-50"
              onClick={() => {
                setShow(false);
                onQue();
              }}
            >
              {msqWord || "예"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const ActivityRemoveButton = ({ onRemove }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div>
        <button
          onClick={() => setShow(!show)}
          className="focus:outline-none flex w-full gap-2 py-2 hover:bg-point-700 hover:scale-105 transition-all duration-100 bg-point-600  rounded-lg font-bold text-text-50 items-center justify-center"
        >
          <TrashCanSVG />
          <div>액티비티 삭제</div>
        </button>

        <AskToolTip
          className={
            "absolute w-44 h-20  bg-background-50 shadow translate-x-11 translate-y-2 shadow-background-300 z-30 text-sm rounded flex items-center justify-center flex-col gap-2"
          }
          msg={"정말 삭제하시겠습니까?"}
          show={show}
          setShow={setShow}
          onQue={() => {
            onRemove();
          }}
          msqWord={"삭제"}
        />
      </div>
    </>
  );
};

export const ChapterRemoveButton = ({ onRemove }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <WithToolTip
        tooltip="챕터 삭제"
        tooltipclassname="px-2 whitespace-nowrap w-fit"
        offsetclass="-top-9 -left-1 after:absolute after:top-7 after:left-2 after:border-transparent after:border-t-background-700"
      >
        <div
          onClick={() => setShow(!show)}
          className="text-point-500 hover:rotate-3 hover:scale-110 transition-all "
        >
          <TrashCanSVG />
        </div>
        <AskToolTip
          msg={"정말 삭제하시겠습니까?"}
          show={show}
          setShow={setShow}
          onQue={() => {
            onRemove();
          }}
          msqWord={"삭제"}
        />
      </WithToolTip>
    </div>
  );
};

export const ChapterUpdateButton = ({ onclick }) => {
  return (
    <WithToolTip
      tooltip="챕터 수정"
      tooltipclassname="px-2 whitespace-nowrap w-fit"
      offsetclass="-top-9 -left-1 after:absolute after:top-7 after:left-2 after:border-transparent after:border-t-background-700"
    >
      <div className="text-point-500 hover:rotate-3 hover:scale-110 transition-all ">
        <PenToSquareSVG />
      </div>
    </WithToolTip>
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
