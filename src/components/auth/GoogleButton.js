import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import Button from '../common/Button';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../modules/auth';

const cookies = new Cookies();

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLoginButton = ({ onSocial }) => {
  const dispatch = useDispatch();
  const onLoginSuccess = (userData) => dispatch(loginSuccess(userData));

  const onSuccess = async (response) => {
    console.log(response);
    console.log(response.profileObj.email);
    // const email = response.profileObj.email

    const res = await axios.post('/accounts/tokentest/', {
      access_token: response.accessToken,
      // email: email
    });
    console.log(res);
    if (res.status === 200) {
      onLoginSuccess(res.data.user);
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          ...res.data.user,
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token,
        }),
      );
      cookies.set('access_token', res.data.access_token);
      cookies.set('refresh_token', res.data.refresh_token, { httpOnly: true });
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
        responseType={'id_token'}
        buttonText="Google Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export default React.memo(GoogleLoginButton);
