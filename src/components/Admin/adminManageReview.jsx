import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { IoSearchCircle } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { adminProduct, adminReview } from "../../redux/action/actions";
import { RiFileUserLine } from "react-icons/ri";
import { idReview, idUser, putReview, putUser } from "./userData";
import { FaSearchPlus } from "react-icons/fa";

export default function AdminManageReview() {
  const initialUserState = {
    _id: "",
    rating: null,
    body: "",
    view: true,
    reply: "",
    student_review: "",
    course_review: "",
  };

  const data = useSelector((state) => state.adminReview);

  const dispatch = useDispatch();
  const [review, setReview] = useState(initialUserState);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState({});
  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchReviewData = async () => {
      if (data) {
        const {
          _id,
          rating,
          body,
          view,
          reply,
          student_review,
          course_review,
        } = data;

        setReview({
          _id,
          rating,
          body,
          view,
          reply,
          student_review,
          course_review,
        });

        if (!view) {
          try {
            await putReview({ view: true, reviewId: _id });
          } catch (error) {
            console.error("Error updating review:", error);
          }
        }
      }
    };

    fetchReviewData();
  }, [data]);

  const resetForm = () => {
    setReview(initialUserState);
    setErrors({});
    setSuccessMessage("");
  };

  const handleFetch = async (event) => {
    event.preventDefault();

    const response = await idReview(searchTerm);

    if (response.data) {
      const { _id, rating, body, view, reply, student_review, course_review } =
        response.data;

      setReview({
        _id,
        rating,
        body,
        view,
        reply,
        student_review,
        course_review,
      });

      if (!view) {
        try {
          await putReview({ view: true, reviewId: _id });
        } catch (error) {
          console.error("Error updating review:", error);
        }
      }
    }

    setSearchTerm("");
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {

    if(review.student_review.length > 0){
      const fetchData = async () => {
        try {
          const response = await idUser(review.student_review);
          console.log(user.student_review);
          if (response.data) {
            setUser(response.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();

    }
   

    
  }, [review.student_review]);

  const handleSubmit = async (e) => {
    console.log("Hola");
    e.preventDefault();
    try {
      await putReview({
        reviewId: review._id,
        reply: review.reply,
      });
      window.alert("El Usuario se ha actualizado exitosamente.");
      resetForm();
      dispatch(adminReview({}));
    } catch (error) {
      console.error("Error al actualizar el curso:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "status" ? value === "true" : value === "false" ? false : value;
    setReview((prevUser) => ({
      ...prevUser,
      [name]: newValue,
    }));
  };

  return (
    <div className="w-full h-full flex flex-col border-[#151139] border-[1px] ">
      <div className="w-full h-[40px] bg-[#151139] flex flex-row items-center">
        <p className="text-white ml-6 text-[20px]">Search & Reply Review</p>
      </div>
      <div className="w-full h-[20%] bg-[#151139] flex flex-row ">
        <div className="h-full w-[40%] ">
          <div className="w-full h-full pl-[20px] bg-[#151139] flex flex-row items-center">
            <input
              placeholder="Search User by ID"
              type="search"
              value={searchTerm}
              className="w-[400px] h-[40px] rounded-lg text-black px-6 py-3 text-base hover:border-[#7aacfd] cursor-pointer transition mr-[15px]"
              onChange={handleSearch}
            />
            <IoSearchCircle
              className="text-[50px] text-white cursor-pointer transition-transform transform-gpu hover:shadow-white active:scale-95"
              type="submit"
              onClick={handleFetch}
            />
          </div>
        </div>
  
        {review._id && review._id.length > 0 && (
          <div className="h-full w-[60%] flex items-center justify-center bg-[#373a6c] ">
            <div className="h-full w-[50%] flex items-center justify-center">
              <h1 className="text-yellow-500 text-[18px]">{`Review Id: ${review._id}`}</h1>
            </div>
            <div className="h-full w-[30%] flex items-center justify-center">
              <h1 className="text-yellow-500 text-[18px]">{`User Valoration: ${review.rating}`}</h1>
            </div>
          </div>
        )}
      </div>
  
      {review._id && review._id.length ? (
        <>
          <form className="bg-[#282a54] w-full h-[96%] grid grid-rows-2 gap-[5px] p-[5px]">
            <div className="bg-[#373a6b] w-full h-full rounded-[10px]">
              <div className="w-full h-[20%] flex items-center justify-evenly ">
                <div className="h-full w-[30%] flex flex-row items-center justify-evenly">
                  <h1 className="text-yellow-500">User Name:</h1>
                  <h1 className="text-white">
                    {user.name} {user.lastname}
                  </h1>
                </div>
                <div className="h-full w-[30%] flex flex-row items-center justify-evenly">
                  <h1 className="text-yellow-500">User Email:</h1>
                  <h1 className="text-white">{user.email}</h1>
                </div>
                <div className="h-full w-[30%] flex flex-row items-center justify-evenly">
                  <h1 className="text-yellow-500">Course Id:</h1>
                  <h1 className="text-white">{review.course_review}</h1>
                </div>
              </div>
              <div className="w-full h-[80%] p-[20px]">
                <h1 className="text-yellow-500 text-[18px]">User Review:</h1>
                <h1 className="text-white text-[18px]">{review.body}</h1>
              </div>
            </div>
            <div className="bg-[#373a6b] w-full h-full rounded-[10px]">
              <div className="w-full h-[5%] pl-[20px] mt-[5px]">
                <h1 className="text-yellow-500 text-[18px]">Post Reply</h1>
              </div>
              <div className="w-full h-[65%] p-[20px]">
                <textarea
                  className="w-[100%] h-[100%]"
                  value={review.reply}
                  name="reply"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="w-full h-[20%] flex items-center justify-center">
                <button
                  type="submit"
                  className="w-[250px] h-[50px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded"
                  onClick={handleSubmit}
                >
                  Post Reply
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="w-full h-full rounded-[10px] items-center justify-center flex">
            <h1 className="text-yellow-500 text-[40px]">Search a New Review to Reply</h1>
            <FaSearchPlus className="text-white text-[40px] ml-[30px]" />
          </div>
        </>
      )}
    </div>
  );
  
}