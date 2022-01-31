import React from "react";
import GoogleLogin from "react-google-login";
import { SignInIconWithBg } from "@/icons";
import { login, setGoogleToken, loginStart, loginFail } from "@/redux/auth";
import { useDispatch } from "react-redux";

// 로그인 성공시 정보 저장은 thunk에서 처리

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const GoogleLoginButton = ({ onSocial }) => {
  const dispatch = useDispatch();

  const onSuccess = async (response) => {
    // const email = response.profileObj.email
    dispatch(loginStart());
    dispatch(setGoogleToken(response.accessToken));
    dispatch(login());
  };

  const onFailure = (error) => {
    dispatch(loginFail(error));
  };

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
