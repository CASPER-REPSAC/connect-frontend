import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLoginButton = ({ onSocial }) => {
  const onSuccess = async (response) => {
    console.log(response);
    console.log(response.profileObj.email);
    // const email = response.profileObj.email
    const headers = {
      'Access-Control-Request-Headers': 'content-type',
      'Access-Control-Request-Method': 'POST',
    };
    const res = await axios.post('/accounts/tokentest/', {
      access_token: response.accessToken,
      // email: email
    });
    console.log(res);
    if (res.status === 200) {
      cookies.set('access_token', res.data.access_token);
    }
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div>
      <GoogleLogin
        // style={{height:"100px"}}
        clientId={clientId}
        responseType={'id_token'}
        buttonText="Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export default React.memo(GoogleLoginButton);
