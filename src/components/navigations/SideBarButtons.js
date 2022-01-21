import { useState } from "react";
import { log } from "#serv";
import {
  SearchIconWithBg,
  SignOutIconWithBg,
  KeyboardIconWithBg,
  CogIconWithBg,
  CasLogoIconWithBg,
  GitIssueIconWithBg,
  UserIconWithBg,
  UserBoardIconWithBg,
} from "@/icons";
import { ExpendableIcons } from "@/icons";
import { SettingsModal } from "#comp/settings";

export { CasLogoIconWithBg as HomeButton };
export { KeyboardIconWithBg as ActivityWriteButton };
export { GoogleLoginButton } from "#comp/auth/GoogleButton";

export const UserButton = () => {
  return (
    <ExpendableIcons
      parentIcon={<UserIconWithBg />}
      childIcons={[<UserBoardIconWithBg />, <SignOutIconWithBg />]}
    />
  );
};

export const SettingsButton = () => {
  const [show, setShow] = useState(false);
  console.log("show", show);
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

const SearchButtonInput = () => {
  return (
    <div className="flex items-center h-fit text-text-50">
      <input
        type="text"
        className="bg-transparent border-b-2 border-b-text-200 w-32 mr-5 focus:outline-none m-2"
      />
    </div>
  );
};

export const SearchButton = ({ isActive }) => {
  return (
    <ExpendableIcons
      search
      parentIcon={<SearchIconWithBg isActive={isActive} />}
      childIcons={[<SearchButtonInput />]}
    />
  );
};

//  <Link to={btn.to} key={btn.to}>
//       <WithToolTip
//         tooltip={btn.tooltip}
//         offset="right"
//         tooltipclassname="origin-left rotate-12 min-w-tooltip after:right-[120px] p-3 rounded-2xl"
//       >
//         <RoundedBg
//           className={`${
//             location.pathname === btn.to
//               ? `bg-background-800 rounded-2xl text-text-50 hover:bg-background-700 hover:text-text-50 `
//               : "hover:bg-background-400 min-w-"
//           } hover:text-text-800 bg-background-300 text-text-50 gruop text-xl`}
//           element={
//             btn.activeElement && location.pathname === btn.to
//               ? btn.activeElement
//               : btn.element
//           }
//         />
//       </WithToolTip>
//     </Link>
