import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { postReview } from "../../redux/action/actions";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useLocation } from 'react-router-dom'; 
import { useTranslation } from "react-i18next";


const Create_review = () => {
    const [userData] = useLocalStorage("userData", {});
    const { user } = useAuth0();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const location = useLocation(); 
    const courseId = location.pathname.split('/').pop();
    const { t , i18n} = useTranslation()


  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        rating: rating,
        body: comment,
        user_id: userData._id,
        user_name: userData.name,
        user_lastname: userData.lastname,
        user_img: userData.img,
        course_id: courseId,
      };
      const response = await dispatch(postReview(formData));
      if (response) {
        alert("Comentario enviado exitosamente");
        onReviewPosted(response.data);
        setComment("");
      } else {
        console.error("Error al guardar el comentario:", response);
      }
    } catch (error) {
      console.error("Error al guardar el comentario:", error);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="w-full mb-4">
      <div className="bg-[#1E68AD] flex items-start">
        <hr />
        <h2 className="text-2xl text-white mb-4">{t("¡CUÉNTANOS TU EXPERIENCIA!")}</h2>
      </div>

      <br />
      <div className="">
        <div className="flex items-center">
          <img
            className="w-10 h-10 mr-2 rounded-full object-cover justify-self-center"
            src={user?.picture || userData?.img || "/img/avatar_land.png"}
            alt=""
          />
          <span className="text-white font-bold">
            {user?.name}
            {userData?.name + " " + userData?.lastname}
            <b
              style={{ fontSize: "14px", fontWeight: "100", marginLeft: "4px" }}
            >
              ↴
            </b>
          </span>
        </div>
        <div className="flex items-center mt-4">
          <span
            className="flex justify-self relative"
            style={{ top: "-2px", marginRight: "6px", fontSize: "18px" }}
          >
            {t("VALORACIÓN")}{" : "}
          </span>
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-6 h-6 cursor-pointer`}
              onClick={() => handleStarClick(index + 1)}
              onMouseEnter={(e) => {
                for (let i = 0; i <= index; i++) {
                  const star =
                    e.currentTarget.parentNode.childNodes[i].childNodes[0];
                  star.setAttribute("fill", "orange");
                }
              }}
              onMouseLeave={(e) => {
                for (let i = 0; i < 5; i++) {
                  const star =
                    e.currentTarget.parentNode.childNodes[i].childNodes[0];
                  if (i >= rating) {
                    star.setAttribute("fill", "white");
                  } else {
                    star.setAttribute("fill", "orange");
                  }
                }
              }}
            >
              {index < rating ? (
                <path
                  fill="orange"
                  d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                />
              ) : (
                <path
                  fill="white"
                  d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                />
              )}
            </svg>
          ))}
          <span className="text-red ml-1 relative" style={{ top: "-2px" }}>
            {rating}
          </span>
        </div>
        <form
          className="max-w-2xl bg-white rounded-lg border border-gray-700 p-2 mx-auto mt-4"
          onSubmit={handleSubmit}
        >
          <div className="px-3 mb-2 mt-2 w-full h-full">
            <textarea
              placeholder= {t("ESCRIBE AQUÍ TU RESEÑA.")}
              style={{ width: "500px" }}
              className="w-500 bg-gray-100 rounded border border-gray-300 leading-normal resize-none h-30 py-2 px-3 font-small placeholder-gray-500 focus:outline-none focus:bg-grayv text-black"
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
          </div>
          <div className="flex justify-end px-4">
            <input
              type="submit"
              className="px-2.5 py-1.5 rounded-md text-white text-sm bg-[#1E68AD] hover:bg-black"
              value= {t("ENVIAR RESEÑAS")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create_review;
