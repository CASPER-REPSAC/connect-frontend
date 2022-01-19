import {
  SearchIcon,
  SignInIcon,
  KeyboardIcon,
  CogIcon,
  CasLogoIcon,
  GitIssueIcon,
} from "./FontAwesomeIcons";
import { SideBarIconFrame } from "@/icons/IconFrames";

export const SearchIconWithBg = (props) => {
  return (
    <SideBarIconFrame element={<SearchIcon />} isActvie={props.isActive} />
  );
};

export const SignInIconWithBg = (props) => {
  return (
    <SideBarIconFrame element={<SignInIcon />} isActvie={props.isActive} />
  );
};

export const KeyboardIconWithBg = (props) => {
  return (
    <SideBarIconFrame element={<KeyboardIcon />} isActvie={props.isActive} />
  );
};

export const CogIconWithBg = (props) => {
  return <SideBarIconFrame element={<CogIcon />} isActvie={props.isActive} />;
};

export const CasLogoIconWithBg = (props) => {
  return (
    <SideBarIconFrame
      element={<CasLogoIcon />}
      isActvie={props.isActive}
      className={props.className}
    />
  );
};

export const GitIssueIconWithBg = (props) => {
  return (
    <SideBarIconFrame
      element={<GitIssueIcon />}
      isActvie={props.isActive}
      className={props.className}
    />
  );
};
