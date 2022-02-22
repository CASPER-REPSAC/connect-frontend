import React from "react";

export function LoginGuide() {
  return <div>LoginGuide</div>;
}

export function LoadingGuide() {
  return <div>LoadingGuide</div>;
}

export const Guides = {
  Login: LoginGuide,
  Loading: LoadingGuide,
};

export default Guides;
