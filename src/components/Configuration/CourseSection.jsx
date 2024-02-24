import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getUserCourses } from '../../redux/action/actions';
import { useTranslation } from "react-i18next";


const CourseSection = () => {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.allUsers)
    const userCourses = useSelector(state => state.userCourses)
    const [userData, setUserData] = useState(null); 
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem('userData')))
    const { t , i18n} = useTranslation()
    
    useEffect(() => {
        dispatch(getAllUsers());
        setIsUserLoaded(false)
    }, [user, dispatch]);

    useEffect(() => {
        if (allUsers && !isUserLoaded && !userLogin) {
            allUsers.forEach(u => {
                if (u.email === user.email) {
                  setUserData(u);
                    setIsUserLoaded(true);
                }
            });
        } 
       
    }, [allUsers, user, isUserLoaded]);

    useEffect(()=>{
      if(userData && isUserLoaded){

        dispatch(getUserCourses(userData._id))
      }
      if(userLogin ){
        dispatch(getUserCourses(userLogin._id))
      }
    },[userData])


return (
  <div className="flex-rows w-full h-full  items-center grid grid-cols-2 gap-[10px] grid-rows-auto overflow-hidden  justify-center p-[10px] overflow-y-scroll">
  {
    userCourses && userCourses.map((c, index)=> (
    <div key={index}  className="flex item-center justify-center">
      <div className="bg-white shadow-lg border-[1px] border-gray-200 flex flex-col w-[90%]">
      <img src={c.image} alt={c.language} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="text-2xl font-semibold mb-2 text-gray-800">{t(`LANGUAGE_${c.language.toUpperCase()}`)}</h3>
        <p className="text-gray-600 mb-2">{t("NIVEL")}{" "}{t(`NIVEL_${c.level.toUpperCase()}`)}</p>
        <p className="text-gray-600 mb-2"> {t("DURACION_DE")}{":"}{t(`DURACION_${c.duration.toUpperCase()}`)}</p>
        <p className="text-gray-600 mb-2">{t("EMPIEZA EL DIA")}{c.start_time.split('T')[0]}</p>
        <p className="text-gray-600 mb-2">{t("FECHA FINALIZACION")}{":"}{c.finish_time.split('T')[0]}</p>
        <p className="text-gray-600 mb-2">{t("HORARIOS")}{":"}{t(`SCHEDULE_${c.schedule.toUpperCase()}`)}</p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-semibold">${c.price}</p>
        </div>
      </div>
      </div>
    </div>
    ))
  }
  </div>
);


}

export default CourseSection