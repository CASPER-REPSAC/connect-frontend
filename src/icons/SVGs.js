import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSignInAlt,
  faKeyboard,
  faCog,
  faUser,
  faStream,
  faPen,
  faChevronLeft,
  faPaperPlane,
  faPlus,
  faTrashCan,
  faSquarePlus,
  faPenToSquare,
  faHand,
  faPersonRunning,
  faFile,
  faArrowLeft,
  faMinus,
  faCaretLeft,
  faCaretRight,
  faRightToBracket,
  faRightFromBracket,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { CasLogoSVG as CasLogo } from "./CasLogoSVG";
import { GitIssueSVG as GitIssue } from "./GitIssueSVG";

export const MoonSVG = () => {
  return <FontAwesomeIcon icon={faMoon} />;
};
export const SunSVG = () => {
  return <FontAwesomeIcon icon={faSun} />;
};
export const CaretLeftSVG = () => {
  return <FontAwesomeIcon icon={faCaretLeft} />;
};
export const CaretRightSVG = () => {
  return <FontAwesomeIcon icon={faCaretRight} />;
};

export const ArrowLeftSVG = () => {
  return <FontAwesomeIcon icon={faArrowLeft} />;
};

export const MinusSVG = () => {
  return <FontAwesomeIcon icon={faMinus} />;
};

export const HandSVG = () => {
  return <FontAwesomeIcon icon={faHand} />;
};

export const FileSVG = () => {
  return <FontAwesomeIcon icon={faFile} />;
};

export const PersonRunningSVG = () => {
  return <FontAwesomeIcon icon={faPersonRunning} />;
};

export const TrashCanSVG = () => {
  return <FontAwesomeIcon icon={faTrashCan} />;
};

export const PenToSquareSVG = () => {
  return <FontAwesomeIcon icon={faPenToSquare} />;
};

export const ChevronLeftSVG = () => {
  return <FontAwesomeIcon icon={faChevronLeft} />;
};
export const PlusSVG = () => {
  return <FontAwesomeIcon icon={faPlus} />;
};

export const SquarePlusSVG = () => {
  return <FontAwesomeIcon icon={faSquarePlus} />;
};
export const PaperPlaneSVG = () => {
  return <FontAwesomeIcon icon={faPaperPlane} />;
};

export const SearchSVG = () => {
  return <FontAwesomeIcon icon={faSearch} />;
};
export const StreamSVG = () => {
  return <FontAwesomeIcon icon={faStream} />;
};
export const SignInSVG = () => {
  return <FontAwesomeIcon icon={faRightToBracket} />;
};
export const SignOutSVG = () => {
  return <FontAwesomeIcon icon={faRightFromBracket} />;
};
export const KeyboardSVG = () => {
  return <FontAwesomeIcon icon={faKeyboard} />;
};
export const PenSVG = () => {
  return <FontAwesomeIcon icon={faPen} />;
};
export const CogSVG = () => {
  return <FontAwesomeIcon icon={faCog} />;
};
export const UserSVG = () => {
  return <FontAwesomeIcon icon={faUser} />;
};

export const extractSvgClass = (className) => {
  if (!className) return;
  const classNameList = className.split(" ");
  const svgClassNameList = [];

  for (let i; i < classNameList.length; i++) {
    if (classNameList[i].split("-") === "fill") {
      svgClassNameList.concat(classNameList[i]);
    }
  }
  return svgClassNameList.join(" ");
};

export const CasLogoSVG = () => {
  return <CasLogo className="fill-inherit" width="23px" />;
};
export const GitIssueSVG = () => {
  return <GitIssue className="fill-inherit" width="23px" />;
};
