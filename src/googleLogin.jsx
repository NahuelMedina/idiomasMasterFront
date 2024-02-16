import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div>
        <button onClick={() => loginWithRedirect({ screen_hint: 'signup', connection: 'google-oauth2' })}>
                <img src="https://raw.githubusercontent.com/react-native-google-signin/google-signin/HEAD/img/signin-button.png" alt="" className="w-50 h-14" />
        </button>
        <br />
        <button onClick={() => loginWithRedirect({ screen_hint: 'signup', connection: 'facebook' })}>
                <img src="https://www.freeiconspng.com/img/18026" alt="" className="w-50 h-14" />
        </button>
      </div>
    );
};

export default LoginButton;
