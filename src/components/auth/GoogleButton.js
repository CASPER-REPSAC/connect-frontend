import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import {Cookies} from 'react-cookie';
import Button from '../common/Button';

const cookies = new Cookies();

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLoginButton = ({ onSocial }) => {
  const onSuccess = async (response) => {
    console.log(response);
    console.log(response.profileObj.email);
    // const email = response.profileObj.email

    const res = await axios.post('/accounts/tokentest/', {
      access_token: response.accessToken,
      // email: email
    })
    console.log(res);
    if (res.status===200){
      cookies.set('access_token', res.data.access_token);
    }
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        render={renderProps => (
      <Button onClick={renderProps.onClick} style={{}}>구글로 로그인</Button>
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
