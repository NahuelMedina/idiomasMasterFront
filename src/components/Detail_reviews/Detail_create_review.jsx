import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { postReview } from '../../redux/action/actions';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useLocation } from 'react-router-dom';
import Swal from "sweetalert2";

const Create_review = () => {
    const { isAuthenticated } = useAuth0();
    // const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))
    const [userData] = useLocalStorage("userData", {});
    const { user } = useAuth0();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();
    const courseId = location.pathname.split('/').pop();

    const handleStarClick = (value) => {
        setRating(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated && !userData.hasOwnProperty("email")) {
            Swal.fire({
                icon: "info",
                title: "Necesitas registrarte para realizar una valoración!!",
                footer: '<a href="/register">Registrarse</a>',
            });
            return;
        }
        try {
            const formData = {
                rating: rating,
                body: comment,
                user_id: userData._id,
                user_name: userData.name,
                user_lastname: userData.lastname,
                user_img: userData.img,
                course_id: courseId
            };
            console.log("ESTO ENVIA FORMDATA", formData)
            dispatch(postReview(formData));
            Swal.fire({
                icon: "success",
                title: "¡Muchas Gracias Por tu Valoración!",
                showConfirmButton: false,
                timer: 2000,
            });

        } catch (error) {
            console.error('Error al guardar la reseña:', error);
            Swal.fire({
                icon: "error",
                title: "Error al guardar la reseña",
                text: error,
                showConfirmButton: false,
                timer: 2200,
            });
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    return (
        <div className="w-full mb-4 mt-4">
            <div className="bg-[#1E68AD] p-2 flex justify-ce items-start">
                <h2 className="text-2xl text-white">DEJA UN COMENTARIO</h2>
            </div>
            <div className='ml-4'>
                <div className="flex items-center">
                    <img className="w-10 h-10 mr-2 rounded-full" src={user?.picture} alt="" />
                    <span className="text-white font-bold">{user?.name}<b style={{ fontSize: '14px', fontWeight: '100', marginLeft: '4px' }}>↴</b></span>
                </div>
                <div className="flex items-center mt-4">
                    {[...Array(5)].map((_, index) => (
                        <svg
                            key={index}
                            className={`w-6 h-6 cursor-pointer`}
                            onClick={() => handleStarClick(index + 1)}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            {index < rating ? (
                                <path
                                    fill="orange"
                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                                />
                            ) : (
                                <path
                                    className='hover:bg-orange'
                                    fill="white"
                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                                />
                            )}
                        </svg>
                    ))}
                    <span className="text-white ml-2">{rating}</span>
                </div>
                <form className="max-w-2xl bg-white rounded-lg border border-gray-700 p-2 mx-auto mt-4" onSubmit={handleSubmit}>
                    <div className="px-3 mb-2 mt-2 w-full h-full">
                        <textarea
                            placeholder="Escribe aquí tu reseña."
                            style={{ width: '500px' }}
                            className="w-500 bg-gray-100 rounded border border-gray-300 leading-normal resize-none h-20 py-2 px-3 font-small placeholder-gray-500 focus:outline-none focus:bg-grayv text-black"
                            value={comment}
                            onChange={handleCommentChange}
                        ></textarea>
                    </div>
                    <div className="flex justify-end px-4">
                        <input type="submit" className="px-2.5 py-1.5 rounded-md text-white text-sm bg-[#1E68AD] hover:bg-black" value="Enviar comentario" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create_review;
