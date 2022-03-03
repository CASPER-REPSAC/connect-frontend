import { useState, useRef } from "react";
import {
  SearchIconWithBg,
  SignOutIconWithBg,
  // KeyboardIconWithBg,
  PenIconWithBg,
  CogIconWithBg,
  CasLogoIconWithBg,
  GitIssueIconWithBg,
  UserIconWithBg,
  UserBoardIconWithBg,
} from "@/icons";
import { ExpendableIcons } from "@/icons";
import { SettingsModal } from "#comp/settings";
import { changeSearchInput } from "@/redux/inputs";
import { logout } from "@/redux/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export { CasLogoIconWithBg as HomeButton };
export { PenIconWithBg as ActivityWriteButton };
export { GoogleLoginButton } from "#comp/auth/GoogleButton";

export const UserButton = ({ profile }) => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return (
    <ExpendableIcons
      parentIcon={<UserIconWithBg profile={profile} />}
      childIcons={[
        <UserBoardIconWithBg />,
        <SignOutIconWithBg onClick={() => onLogout()} />,
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
  const { keyword, type, requestCounter } = useSelector(
    (state) => state.inputs.searchInput
  );
  const dispatch = useDispatch();
  const searchInput = useRef();

  const onChange = (e) => {
    dispatch(changeSearchInput(e.target));
  };
  const onHover = () => {
    searchInput.current.focus();
  };
  const onMouseLeave = () => {
    searchInput.current.blur();
  };

  const onClick = () => {
    dispatch(
      changeSearchInput({ name: "requestCounter", value: requestCounter + 1 })
    );
  };

  const navigate = useNavigate();
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
          if (e.key === "Enter") {
            dispatch(changeSearchInput(e.target));
            navigate(`/search`);
          }
        }}
      >
        <div>
          <SearchIconWithBg
            isActive={isActive}
            onClick={() => {
              onClick();
            }}
          />
        </div>
        <div className={className}>
          <div className="flex items-center h-fit text-text-50">
            <input
              type="text"
              name="keyword"
              className="bg-transparent border-b-2 border-b-text-200 w-32 mr-5 focus:outline-none m-2"
              onChange={(e) => onChange(e)}
              ref={searchInput}
            />
          </div>
        </div>
      </div>
    </>
  );
};
