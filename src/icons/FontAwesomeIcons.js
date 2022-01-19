import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSignInAlt,
  faKeyboard,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { CasLogoSVG } from "./CasLogoSVG";
import { GitIssueSVG } from "./GitIssueSVG";

export const SearchIcon = () => {
  return <FontAwesomeIcon icon={faSearch} />;
};
export const SignInIcon = () => {
  return <FontAwesomeIcon icon={faSignInAlt} />;
};
export const KeyboardIcon = () => {
  return <FontAwesomeIcon icon={faKeyboard} />;
};
export const CogIcon = () => {
  return <FontAwesomeIcon icon={faCog} />;
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

export const CasLogoIcon = () => {
  return <CasLogoSVG className="fill-inherit" width="23px" />;
};
export const GitIssueIcon = () => {
  return <GitIssueSVG className="fill-inherit" width="23px" />;
};
