import { useState } from "react";
import {
  SearchIconWithBg,
  PenIconWithBg,
  CogIconWithBg,
  CasLogoIconWithBg,
  GitIssueIconWithBg,
  UserIconWithBg,
} from "./SideBarIcons";
import { ExpendableIcons } from "#comp/common";
import { UserBox } from "#comp/auth/UserBox";
import { SettingsModal } from "#comp/settings";
import { useSearchButton } from "@/hooks";
import { Link } from "react-router-dom";

export { CasLogoIconWithBg as HomeButton };
export { PenIconWithBg as ActivityWriteButton };
export { GoogleLoginButton } from "#comp/auth/GoogleButton";

const UserIconInfo = () => {
  return (
    <div className="rounded-3xl overflow-hidden h-fit w-fit drop-shadow-md shadow-text-600 bg-background-50 ">
      <UserBox />
    </div>
  );
};

export const UserButton = ({ profile }) => {
  return (
    <ExpendableIcons
      parentIcon={<UserIconWithBg profile={profile} />}
      childIcons={[
        // ,
        <UserIconInfo />,
        // <SignOutIconWithBg onClick={() => onLogout()} />,
      ]}
    />
  );
};

export const SettingsButton = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <CogIconWithBg
        onClick={() => {
          setShow(true);
        }}
      />
      <SettingsModal show={show} setShow={setShow} />
    </>
  );
};

export const GitIssueButton = () => {
  const onClick = () => {
    window.open("https://github.com/CASPER-REPSAC/casper-api/issues");
  };
  return <GitIssueIconWithBg onClick={onClick} />;
};

export const SearchButton = ({ isActive }) => {
  let className = `opacity-0 scale-0 none w-0 group-hover:opacity-100 group-hover:scale-100 transition-all group-hover:w-40`;

  const {
    onHover,
    onMouseLeave,
    onEnter,
    onIconClick,
    onKeywordChange,
    searchInput,
  } = useSearchButton();

  return (
    <>
      <div
        className="w-fit h-fit flex rounded-3xl bg-background-600 bg-opacity-90 z-30 hover:gap-x-2 group"
        onMouseOver={() => {
          onHover();
        }}
        onMouseLeave={() => {
          onMouseLeave();
        }}
        onKeyPress={(e) => {
          onEnter(e);
        }}
      >
        <div>
          <SearchIconWithBg
            isActive={isActive}
            onClick={() => {
              onIconClick();
            }}
          />
        </div>
        <div className={className}>
          <div className="flex items-center h-fit text-text-50">
            <input
              type="text"
              name="keyword"
              className="bg-transparent border-b-2 border-b-text-200 w-32 mr-5 focus:outline-none m-2"
              onChange={(e) => onKeywordChange(e)}
              ref={searchInput}
            />
          </div>
        </div>
      </div>
    </>
  );
};
