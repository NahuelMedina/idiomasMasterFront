import React, { useState, useEffect } from 'react';
import CreateReview from './Detail_create_review';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const ReviewComponent = () => {
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const courseId = location.pathname.split('/').pop();
  const URL = import.meta.env.VITE_URL_HOST;
  const { t , i18n} = useTranslation()


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${URL}/getAllReviews`);
        setReviews(response.data);
        console.log("ESTO TRAE AXIOS REVIEWS", response.data)
      } catch (error) {
        console.error('Error al obtener las reseñas:', error);
      }
    };

    fetchReviews();
  }, [URL]);

  const filteredReviews = reviews.filter(review => review.course_review === courseId);
  console.log("Reseñas filtradas por courseId:", filteredReviews);

  return (
    <div className="bg-[#1E68AD] text-white w-4/5 flex flex-col items-start p-5 rounded-md mb-20">
      <div className="mb-4">
        <CreateReview />
      </div>
      <hr style={{border:'1px solid white', width:'100%', borderRadius:'50px'}} />
      <br />
      <div className="bg-[#1E68AD] p-2 flex justify-ce items-start">
        <h2 className="text-2xl text-white">{t("COMENTARIOS DEL CURSO")} <b style={{fontSize:'22px', fontWeight:'100'}}>↓</b></h2>
      </div>
      {filteredReviews.map(review => (
        <div key={review._id} className='ml-4 mt-4 mb-8 border p-5 rounded-md bg-white text-black'>
          <div className="flex items-center mb-4 ">
            <img className="w-10 h-10 mr-2 rounded-full" src={review.student_img} alt="Profile picture" />
            <div>
              <p className="text-black">{review.student_name} {review.student_lastname}</p>
              <div className="flex items-center">
                {[...Array(review.rating)].map((_, index) => (
                  <svg key={index} className="w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
                <span className='ml-2' style={{fontSize:'14px'}}>{review.rating}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <p className="mt-1">{review.body}</p>
            <div className="flex items-center justify-between mt-4 text-sm text-white-600 fill-current">
              <div className="flex items-center">
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewComponent;