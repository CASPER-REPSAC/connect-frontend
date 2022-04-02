import React, { useState } from "react";
import {
  PaperPlaneSVG,
  PenToSquareSVG,
  CogSVG,
  PenSVG,
  PlusSVG,
  TrashCanSVG,
  HandSVG,
  MinusSVG,
  SquarePlusSVG,
  CaretRightSVG,
  CaretLeftSVG,
} from "@/icons";
import { WithToolTip } from "./ToolTip";
import { Link } from "react-router-dom";

export const PageControlButtons = ({ onPreviousPage, onNextPage }) => {
  return (
    <div className="flex gap-4 text-lg text-text-800 w-fit">
      <button
        onClick={() => {
          onPreviousPage();
        }}
      >
        <CaretLeftSVG />
      </button>
      <button
        onClick={() => {
          onNextPage();
        }}
      >
        <CaretRightSVG />
      </button>
    </div>
  );
};

export const ToEndedActivityButton = () => {
  return (
    <Link
      to="/activities/ended"
      className="bg-background-500 h-fit w-fit py-1 px-3 rounded text-text-50 text-sm text-center hover:text-text-50 hover:translate-x-3"
    >
      <span>종료 액티비티 보러가기 </span>
      <span>
        <CaretRightSVG />
      </span>
    </Link>
  );
};

export const SubmitButton = React.memo(({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className=" h-fit mx-2 rounded-2xl text-point-500  hover:text-point-600 transition-all hover:rotate-6 active:text-point-700 active:rotate-12"
    >
      <PaperPlaneSVG />
    </button>
  );
});

export const SubmitButtonWithText = React.memo(({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 h-fit mx-2 rounded-2xl text-point-500  hover:text-text-50 hover:bg-point-500 transition-all active:text-point-700"
    >
      <PaperPlaneSVG /> 작성
    </button>
  );
});

export const ToActivityManageButton = ({ onClick }) => {
  return (
    <WithToolTip
      tooltip="관리"
      tooltipclassname="px-2 whitespace-nowrap w-fit"
      offsetclass="-top-9 -left-1 after:absolute after:top-7 after:left-2 after:border-transparent after:border-t-background-700"
    >
      <div
        onClick={onClick}
        className="text-point-500 hover:rotate-90 transition-all "
      >
        <CogSVG />
      </div>
    </WithToolTip>
  );
};

export const ToWriteChapterButton = ({ activity_id }) => {
  return (
    <Link to={"/write/" + activity_id} className="flex-none">
      <WithToolTip
        tooltip="챕터 추가"
        tooltipclassname="px-2 whitespace-nowrap w-fit"
        offsetclass="-top-9 -left-1 after:absolute after:top-7 after:left-2 after:border-transparent after:border-t-background-700"
      >
        <div className="text-point-500 text-base hover:rotate-90 transition-all">
          <SquarePlusSVG />
        </div>
      </WithToolTip>
    </Link>
  );
};

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
              className="px-2 bg-alert hover:scale-110 transition-all py-1 rounded  font-bold text-text-50"
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
      <div className="relative">
        <button
          onClick={() => setShow(!show)}
          className="focus:outline-none flex w-full gap-2 px-3 py-2 hover:bg-alert hover:scale-105 transition-all duration-100 bg-alert rounded-lg font-bold text-text-50 items-center justify-center"
        >
          <TrashCanSVG />
          <div>액티비티 삭제</div>
        </button>

        <AskToolTip
          className={
            "absolute w-44 h-20  bg-background-50 shadow translate-x-11 translate-y-2 shadow-background-300 z-30 text-sm rounded flex items-center justify-center flex-col gap-2 " +
            "top-[-95px]"
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

export const JoinActivityButton = ({ onClick }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex-none">
      <button
        onClick={() => setShow(!show)}
        className="text-point-600 transition-all text-sm"
      >
        <PlusSVG /> 참여
      </button>
      <AskToolTip
        msg={"참여 하시겠습니까?"}
        show={show}
        setShow={setShow}
        onQue={() => {
          onClick();
        }}
        msqWord={"참여"}
      />
    </div>
  );
};

export const QuitActivityButton = ({ onClick }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex-none">
      <button
        onClick={() => setShow(!show)}
        className="text-alert transition-all text-sm"
      >
        <MinusSVG /> 탈퇴
      </button>
      <AskToolTip
        msg={"탈퇴 하시겠습니까?"}
        show={show}
        setShow={setShow}
        onQue={() => {
          onClick();
        }}
        msqWord={"탈퇴"}
      />
    </div>
  );
};

export const ChapterRemoveButton = ({ onRemove }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button
        onClick={() => setShow(!show)}
        className="text-alert transition-all text-sm flex-none"
      >
        <TrashCanSVG /> 삭제
      </button>
      <AskToolTip
        msg={"정말 삭제하시겠습니까?"}
        show={show}
        setShow={setShow}
        onQue={() => {
          onRemove();
        }}
        msqWord={"삭제"}
      />
    </div>
  );
};

export const CommentRemoveButton = ({ onRemove }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button
        onClick={() => setShow(!show)}
        className="text-alert transition-all text-sm flex-none"
      >
        <TrashCanSVG /> 삭제
      </button>
      <AskToolTip
        msg={"정말 삭제하시겠습니까?"}
        show={show}
        setShow={setShow}
        onQue={() => {
          onRemove();
        }}
        msqWord={"삭제"}
      />
    </div>
  );
};

export const ChapterUpdateButton = ({ onClick }) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className="text-point-500 hover:text-point-600 transition-all text-sm flex-none"
    >
      <PenToSquareSVG /> 수정
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
