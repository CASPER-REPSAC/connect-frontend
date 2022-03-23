import React from "react";
import { Muted } from "#comp/common";
import { CasLogoSVG } from "@/icons/CasLogoSVG";

export const Footer = () => {
  return (
    <div className="z-50 absolute -bottom-fit left-0 h-fit w-full bg-background-200">
      <div className="bg-background-100 rounded-t-lg h-full flex justify-center items-center mt-5">
        <Muted className="leading-5 w-full px-4 pb-2 pt-4 md:pt-2 uppercase flex items-start md:justify-between md:items-center flex-col md:flex-row">
          <div>COPYRIGHT © 2022 BY CASPER</div>
          <div className="flex gap-2 items-center">
            Family site
            <a
              href="https://www.casper.or.kr/xe/"
              target="_blank"
              rel="noreferrer"
            >
              <CasLogoSVG width="15px" className="fill-text-400" />
            </a>
          </div>
          <div>경상남도 창원시 의창구 창원대학로 20 51호관 51113호</div>
        </Muted>
      </div>
    </div>
  );
};

export default Footer;
