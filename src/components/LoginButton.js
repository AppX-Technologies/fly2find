import React, { useEffect, useState } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import { Google } from 'react-bootstrap-icons';
import { CLIENT_ID, DISCOVERY_DOCUMENT_LINK, LOGIN_PATH } from '../helpers/constants';
import { generateRandomUUID } from '../helpers/global';

const LoginButton = ({ className }) => {
  const [authURI, setAuthURI] = useState(null);

  useEffect(() => {
    async function createAuthURI() {
      let gauthUrl = '';
      let authEndPoint = localStorage.getItem('authorization_endpoint');
      if (!authEndPoint) {
        const responseJSON = await (await fetch(DISCOVERY_DOCUMENT_LINK)).json();
        authEndPoint = responseJSON['authorization_endpoint'];
        localStorage.setItem('authorization_endpoint', responseJSON['authorization_endpoint']);
        localStorage.setItem('token_endpoint', responseJSON['token_endpoint']);
        localStorage.setItem('jwks_uri', responseJSON['jwks_uri']);
      }

      let uid = localStorage.getItem('session-uid');
      if (!uid) {
        uid = generateRandomUUID();
        localStorage.setItem('session-uid', uid);
      }

      gauthUrl += authEndPoint;
      gauthUrl =
        gauthUrl +
        '?client_id=' +
        CLIENT_ID +
        '&response_type=code&scope=openid email&state=' +
        uid +
        '&redirect_uri=' +
        LOGIN_PATH;
      setAuthURI(gauthUrl);
    }
    createAuthURI();
  }, []);

  return !authURI ? (
    <>
      <ProgressBar className={className} striped animated variant="primary" now={100} label="Just a sec.." />
    </>
  ) : (
    <a href={authURI}>
      <Button className={className} id="my-signin2" variant="info">
        <Google className="align-text-bottom me-2" />
        Sign In With Google
      </Button>
    </a>
  );
};

export default LoginButton;
