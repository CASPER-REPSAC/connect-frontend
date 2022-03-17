import React, { useEffect } from "react";
import { useLoadings } from "@/hooks";
import { useSpring, animated } from "react-spring";
import { CasLogoSVG } from "@/icons/CasLogoSVG";

const LoadingsItem = ({ loadingKey, loading, removeLoading }) => {
  const baseClassName =
    "rounded transition-all drop-shadow p-3 max-w-sm text-white ";

  return (
    <div
      className={
        baseClassName + (loading.error === null ? "bg-green-600" : "bg-alert ")
      }
    >
      <div>
        <span className="mr-1">
          {/* {loading.error !== false ? "요청실패! " : "요청중.."} */}
        </span>
        {loadingKey}
      </div>
    </div>
  );
};

const CasLogoSpinner = () => {
  const style = useSpring({
    from: { rotate: 0, transformOrigin: "center" },
    to: { rotate: 360 },
    loop: true,
    // delay: 500,
    // config: { duration: 500 },
  });

  return (
    <animated.div style={style} className=" w-fit">
      <CasLogoSVG width="20px" />
    </animated.div>
  );
};

export const Loadings = () => {
  const { loadings, removeLoading } = useLoadings();

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {loadings && Object.keys(loadings).length > 0 && <CasLogoSpinner />}
    </div>
  );
};

export default Loadings;
