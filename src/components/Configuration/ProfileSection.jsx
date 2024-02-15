
import React, { useEffect } from 'react';
// import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

// import {AuthContext} from "../AuthProvider/AuthProvider";

const ProfileSection = () => {
//   const { auth } = useContext(AuthContext);
//   const user = useSelector(state => state.userDataSession);
//   console.log("ESTO TRAE AUTH", auth); 

//   useEffect(() => {
//     console.log(auth); 
//   }, [auth]); 

//   if (!auth) {
//     return null;
//   }

const { user, isAuthenticated } = useAuth0();

console.log("ESTO VIENE DE USER", user)

if (!isAuthenticated) {
  return <div>Please log in</div>;
}

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div className="flex flex-col items-center space-y-5">
        <img style={{backgroundSize:'cover', objectFit:'cover'}}className="object-cover w-30 h-30 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"  src={user.picture} alt="Bordered avatar" /> 
        <div className="flex flex-col space-y-5">
          <button type="button" className="py-0.4 px-3 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200">
            Cambiar foto
          </button>
          <button type="button" className="py-0.4 px-3 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200">
            Eliminar foto
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-5">
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"></label>
          <input type="text" id="first_name" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="Nombre" value= {user.name} required />  </div>
        <div className="flex flex-col space-y-5">
          <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white" >Apellido</label>
          <input type="text" id="last_name" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="Apellido" value= {user.family_name} required />    </div>
        <div className="flex flex-col space-y-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Email</label>
          <input type="email" id="email" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" placeholder="Email" value= {user.email} required /> </div>
        <div className="flex justify-end">
          <button type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;