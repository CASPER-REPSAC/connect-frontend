import { log } from "#serv";
import {
  SearchIconWithBg,
  SignInIconWithBg,
  KeyboardIconWithBg,
  CogIconWithBg,
  CasLogoIconWithBg,
  GitIssueIconWithBg,
  ExpendNavIcons,
} from "@/icons";

export const ExpendTestButton = () => {
  return (
    <ExpendNavIcons
      parentIcon={<SearchIconWithBg />}
      childIcons={[<SignInIconWithBg />, <SignInIconWithBg />]}
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
