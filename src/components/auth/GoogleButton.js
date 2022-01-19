import React from "react";
import GoogleLogin from "react-google-login";

// 로그인 성공시 정보 저장은 thunk에서 처리
const cookies = new Cookies();

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const GoogleLoginButton = ({ onSocial }) => {
  const dispatch = useDispatch();
  const onLoginSuccess = (userData) => dispatch(loginSuccess(userData));

  const onSuccess = async (response) => {
    // const email = response.profileObj.email

    const res = await axios.post("/accounts/tokentest/", {
      access_token: response.accessToken,
      // email: email
    });
    if (res.status === 200) {
      window.localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("login success", res);
      onLoginSuccess({
        ...res.data.user,
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
      });
      cookies.set("access_token", res.data.access_token, {
        path: "/",
      });
      cookies.set("refresh_token", res.data.refresh_token, {
        httpOnly: true,
        path: "/",
      });
    }
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} style={{}}>
            구글로 로그인
          </Button>
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
