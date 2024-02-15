import { useEffect, useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { userCourses } from "./userData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserCourseCard from "./UserCourseCard";
import React from "react";
import Slider from "react-slick";
import { productData } from "../Admin/userData";
import UserPromoCard from "./UserPromoCard";

export default function UserLanding() {
    const [userData, setUserData] = useState([]);
    const [beginnerData, setBeginnerData] = useState([]);
    const [popularData, setPopularData] = useState([]);
    const [weekendData, setWeekendData] = useState([]);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          color: "gray",
          borderRadius: "50px",
          position: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "19px",
          width: "20px",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          color: "gray",
          borderRadius: "50px",
          position: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "19px",
          width: "20px",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    const userFetch = async () => {
      try {
        const response = await userCourses();

        if (response) {
            setUserData(response);
        }
      } catch (error) {
        return error.message;
      }
    };

    userFetch();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productData();
        if (response) {
          filterData(response.data);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);

  const filterData = (data) => {
    const beginnerCourses = data.filter(element => element.level === 'Beginner');
    setBeginnerData(beginnerCourses);

    const popularCourses = data.filter(element => element.rank === 5);
    setPopularData(popularCourses);

    const weekendCourses = data.filter(element => element.schedule === 'On Weekends');
    setWeekendData(weekendCourses);
  };

  return (
    <div className=" w-full h-full bg-white text-white">
      <div className="flex justify-end items-center w-screen h-[80px] bg-[#1E68AD]">
        <div className="mr-10">
          <SearchBar></SearchBar>
        </div>
      </div>
      <div
        id="landing_descripton"
        className="w-full h-[420px] relative flex flex-col items-center justify-evenly bg-white"
      >
        <div className="w-[90%] h-[50px">
          <h1 className="text-black text-[30px] border-b-[1px] border-black">
            Mis Cursos
          </h1>
        </div>
        <div className="w-[90%] h-[90%] bg-white">
          <Slider
            {...settings}
            className="w-[full] h-[90%] flex items-center justify-center bg-white"
          >
            {userData &&
              userData.length > 0 &&
              userData.map((element) => (
                <UserCourseCard
                  key={element._id}
                  id={element._id}
                  language={element.language}
                  level={element.level}
                  schedule={element.schedule}
                  start_time={element.start_time}
                  duration={element.duration}
                />
              ))}
          </Slider>
        </div>
      </div>

      <div
        id="landing_descripton"
        className="w-full h-[620px] relative flex flex-col items-center justify-evenly bg-white"
      >
        <div className="w-[90%] h-[50px]">
          <h1 className="text-black text-[30px] border-b-[1px] border-black">
            Mas Populares
          </h1>
        </div>
        <div className="w-[90%] h-[90%] bg-white">
          <Slider
            {...settings}
            className="w-full h-[90%] flex items-center justify-center"
          >
            {popularData &&
              popularData.length > 0 &&
              popularData.map((element) => (
                <UserPromoCard
                  key={element._id}
                  id={element._id}
                  language={element.language}
                  level={element.level}
                  schedule={element.schedule}
                  start_time={element.start_time}
                  duration={element.duration}
                  image={element.image}
                  name={"Popular"}
                />
              ))}
          </Slider>
        </div>
      </div>

      <div
        id="landing_descripton"
        className="w-full h-[620px] relative flex flex-col items-center justify-evenly bg-white"
      >
        <div className="w-[90%] h-[50px]">
          <h1 className="text-black text-[30px] border-b-[1px] border-black">
            Comienza hoy una nueva Aventura
          </h1>
        </div>
        <div className="w-[90%] h-[90%] bg-white">
          <Slider
            {...settings}
            className="w-full h-[90%] flex items-center justify-center"
          >
            {beginnerData &&
              beginnerData.length > 0 &&
              beginnerData.map((element) => (
                <UserPromoCard
                  key={element._id}
                  id={element._id}
                  language={element.language}
                  level={element.level}
                  schedule={element.schedule}
                  start_time={element.start_time}
                  duration={element.duration}
                  image={element.image}
                  name={"Begginer"}
                />
              ))}
          </Slider>
        </div>
      </div>

      <div
        id="landing_descripton"
        className="w-full h-[620px] relative flex flex-col items-center justify-evenly bg-white"
      >
        <div className="w-[90%] h-[50px]">
          <h1 className="text-black text-[30px] border-b-[1px] border-black">
            Cursos de Fin de Semana
          </h1>
        </div>
        <div className="w-[90%] h-[90%] bg-white">
          <Slider
            {...settings}
            className="w-full h-[90%] flex items-center justify-center"
          >
            {weekendData &&
              weekendData.length > 0 &&
              weekendData.map((element) => (
                <UserPromoCard
                  key={element._id}
                  id={element._id}
                  language={element.language}
                  level={element.level}
                  schedule={element.schedule}
                  start_time={element.start_time}
                  duration={element.duration}
                  image={element.image}
                  rank={element.rank}
                  name={"Weekend"}
                />
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}