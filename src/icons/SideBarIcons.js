import {
  SearchSVG,
  SignInSVG,
  KeyboardSVG,
  CogSVG,
  CasLogoSVG,
  GitIssueSVG,
  UserSVG,
  StreamSVG,
} from "./SVGs";
import { SideBarIconFrame } from "@/icons/IconFrames";
import { Link } from "react-router-dom";
import { log } from "#serv";

export const SearchIconWithBg = (props) => {
  return (
    <SideBarIconFrame
      element={<SearchSVG />}
      isActive={props.isActive}
      to="/search"
      onClick={props.onClick}
      tooltip={null}
    />
  );
};

export const UserIconWithBg = (props) => {
  return (
    <SideBarIconFrame
      element={<UserSVG />}
      isActive={props.isActive}
      to="#"
      tooltip={null}
      onClick={props.onClick}
    />
  );
};

export const UserBoardIconWithBg = (props) => {
  return (
    <SideBarIconFrame
      element={<StreamSVG />}
      isActive={props.isActive}
      to={`/user`}
      offset="top"
      tooltip={"작성글 목록"}
      onClick={props.onClick}
    />
  );
};

export const SignOutIconWithBg = (props) => {
  return (
    <SideBarIconFrame
      element={<SignInSVG />}
      isActive={props.isActive}
      to="#"
      onClick={props.onClick}
      tooltip={"로그아웃"}
    />
  );
};

export const SignInIconWithBg = (props) => {
  return (
    <SideBarIconFrame
      element={<SignInSVG />}
      isActive={props.isActive}
      to="#"
      onClick={props.onClick}
      tooltip={"구글로 로그인"}
    />
  );
};

export const KeyboardIconWithBg = (props) => {
  return (
    <SideBarIconFrame
      element={<KeyboardSVG />}
      isActive={props.isActive}
      to="/activities/write"
      onClick={props.onClick}
      tooltip={`액티비티 작성`}
    />
  );
};

export const CogIconWithBg = (props) => {
  return (
    <SideBarIconFrame
      element={<CogSVG />}
      isActive={props.isActive}
      to="#"
      onClick={props.onClick}
      tooltip={`설정`}
    />
  );
};

export const CasLogoIconWithBg = (props) => {
  return (
    <SideBarIconFrame
      element={<CasLogoSVG />}
      isActive={props.isActive}
      className={props.className}
      to=""
      onClick={props.onClick}
      tooltip={`홈`}
    />
  );
};

export const GitIssueIconWithBg = (props) => {
  return (
    <SideBarIconFrame
      element={<GitIssueSVG />}
      isActive={props.isActive}
      className={props.className}
      to="#"
      onClick={props.onClick}
      tooltip={`제보 및 건의`}
    />
  );
};
