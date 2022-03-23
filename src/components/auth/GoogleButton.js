import React from "react";
import GoogleLogin from "react-google-login";
import { SignInIconWithBg } from "#comp/navigations/SideBarIcons";
import { useGoogleLogin } from "@/hooks";

// 로그인 성공시 정보 저장은 thunk에서 처리

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLoginTextButtonLooks = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-sm bg-point-500 text-text-50 px-3 py-2 rounded hover:scale-110 transition-all focus:outline-none"
    >
      구글로 로그인 하기
    </button>
  );
};

export const GoogleLoginTextButton = ({ onSocial }) => {
  const { onSuccess, onFailure } = useGoogleLogin();
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <GoogleLoginTextButtonLooks onClick={renderProps.onClick} />
        )}
        responseType={"id_token"}
        buttonText="Google Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export const GoogleLoginButton = ({ onSocial }) => {
  const { onSuccess, onFailure } = useGoogleLogin();
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <SignInIconWithBg onClick={renderProps.onClick} />
        )}
        responseType={"id_token"}
        buttonText="Google Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export default React.memo(GoogleLoginButton);
