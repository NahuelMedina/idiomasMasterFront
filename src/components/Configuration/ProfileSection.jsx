import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocalStorage } from '../../CustomHook/UseLocalStorage';
import { updateUser } from '../../redux/action/actions';
import { useDispatch } from 'react-redux'; 

const ProfileSection = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userData] = useLocalStorage("userData", {});
  const dispatch = useDispatch();

  const defaultAvatarUrl = 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=';
  const [editedData, setEditedData] = useState({
    id: userData?._id || '',
    name: userData?.name || '',
    lastname: userData?.lastname || '',
    email: userData?.email || '',
    password: userData.password || '',
    img: userData?.img || user?.picture || defaultAvatarUrl,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Input cambiado:", { [name]: value });
    setEditedData({
      ...editedData,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditedData({
        ...editedData,
        img: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSaveChanges = async () => {
    try {
      const allFields = editedData;

      console.log("Campos a enviar:", allFields);

      dispatch(updateUser(allFields));
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  useEffect(() => {
    if (user?.sub.includes('google')) {
      setEditedData({
        ...editedData,
        name: user?.given_name || userData?.name || '',
        lastname: user?.family_name || userData?.lastname || '',
        email: user?.email || userData?.email || '',
        password: '', // Bloquea la contraseña
      });
    }
  }, [user, userData]);


  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    (isAuthenticated || Object.keys(userData).length > 0) && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex flex-col items-center space-y-5">
          <img className="object-cover, w-30 h-30 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"  src={editedData.img} alt="Bordered avatar" />
          <div className="flex flex-col space-y-5">
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none'}} id="file-input" />
            {!user?.sub.includes('google') && (
              <label htmlFor="file-input" className="py-0.4 px-4 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 cursor-pointer">
                Cambiar foto
              </label>
            )}
            <button type="button" className={`py-0.4 px-3 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ${user?.sub.includes('google') && 'opacity-50 cursor-not-allowed'}`} disabled={user?.sub.includes('google')}>
              Eliminar foto
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-5">
            <label htmlFor="first_name" className="block mt-3 text-sm font-medium text-indigo-900 dark:text-black">Nombre</label>
            <input type="text" id="first_name" name="name" className={`bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" ${user?.sub.includes('google') && 'opacity-50 cursor-not-allowed'}`} placeholder="Nombre" value={editedData.name} onChange={handleInputChange}  required readOnly={user?.sub.includes('google')} />
          </div>
          <div className="flex flex-col space-y-5">
            <label htmlFor="last_name" className="block mt-3 text-sm font-medium text-indigo-900 dark:text-black">Apellido</label>
            <input type="text" id="last_name" name="lastname" className={`bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" ${user?.sub.includes('google') && 'opacity-50 cursor-not-allowed'}`} placeholder="Apellido" value={editedData.lastname} onChange={handleInputChange}  required readOnly={user?.sub.includes('google')} />
          </div>
          <div className="flex flex-col space-y-5">
            <label htmlFor="email" className="block mt-3 text-sm font-medium text-indigo-900 dark:text-black">Email</label>
            <input type="email" id="email" name="email" className={`bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" ${user?.sub.includes('google') && 'opacity-50 cursor-not-allowed'}`} placeholder="Email" value={editedData.email} onChange={handleInputChange}  required readOnly={user?.sub.includes('google')} />
          </div>
          <div className="flex flex-col space-y-5">
            <label htmlFor="password" className="block mt-3 text-sm font-medium text-indigo-900 dark:text-black">Nueva contraseña</label>
            <input type="password" id="password" name="password" className={`bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" ${user?.sub.includes('google') && 'opacity-50 cursor-not-allowed'}`} placeholder="*************" value={editedData.password} onChange={handleInputChange}  required readOnly={user?.sub.includes('google')}/>
          </div>
          <div className="flex justify-end">
            <button type="submit" onClick={handleSaveChanges} className={`text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800" ${user?.sub.includes('google') && 'opacity-50 cursor-not-allowed'}`}>Guardar</button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileSection;
