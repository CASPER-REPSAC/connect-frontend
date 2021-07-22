import React from 'react';
import GoogleLogin from 'react-google-login';

const clientId =
  '913024146889-49qnknsibum9d47b6as67j38t2ud81kc.apps.googleusercontent.com';

const GoogleLoginButton = ({ onSocial }) => {
  const onSuccess = async (response) => {
    console.log(response);

    const {
      googleId,
      profileObj: { email, name },
    } = response;

    console.log({ googleId, profileObj: { email, name } });

    // await onSocial({
    //     socialId : googleId,
    //     socialType : 'google',
    //     email,
    //     nickname: name
    // })
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div>
      <GoogleLogin
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
