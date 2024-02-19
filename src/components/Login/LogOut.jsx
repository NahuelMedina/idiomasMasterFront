import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocalStorage } from '../../CustomHook/UseLocalStorage'; 
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate()
  const { logout } = useAuth0();
  const [userData, setUserDataLocally] = useLocalStorage("userData"); 

  const handleLogout = () => {
    setUserDataLocally({});
    logout({ logoutParams: { returnTo: window.location.origin } }).then(() => {
      navigate("/")
     
    });
  };

  return (
    <button
      onClick={handleLogout} 
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
