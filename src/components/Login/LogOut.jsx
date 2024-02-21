import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocalStorage } from '../../CustomHook/UseLocalStorage';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const LogoutButton = () => {
  const navigate = useNavigate()
  const { logout } = useAuth0();
  const [userData, setUserDataLocally] = useLocalStorage("userData");

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setUserDataLocally({});
        logout({ logoutParams: { returnTo: window.location.origin } }).then(() => {
          navigate("/")

        });
      }
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
