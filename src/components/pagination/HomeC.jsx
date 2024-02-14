import axios from "axios";
import { useEffect, useState } from "react";
import { FaLanguage } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaRankingStar } from "react-icons/fa6";
import { TbMessageLanguage } from "react-icons/tb";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { Card } from "../Card/Card";

function HomeC() {

  

  const sortByDescending = (data) => {
    return data.sort((a, b) => b.price - a.price);
  };
  const sortByAscending = (data) => {
    return data.sort((a, b) => a.price - b.price);
  };

  const [language, setLanguage] = useState("all");
  const [level, setLevel] = useState("all");
  const [num, setNum] = useState("all");
  const [courses, setCourses] = useState([]);


  const [pagePosition, setPagePosition] = useState(1);
  const itemsOnPage = 3;
  const nextPage = () => {
    setPagePosition((prevPagePosition) => {
      if (prevPagePosition < pageNum) {
        return prevPagePosition + 1;
      } else {
        return prevPagePosition;
      }
    });
  };
  const prevPage = () => {
    setPagePosition((prevPagePosition) => {
      if (prevPagePosition > 1) {
        return prevPagePosition - 1;
      } else {
        return prevPagePosition;
      }
    });
  };
  
  useEffect(() => {
    setPagePosition(1);
  }, [courses]);

  const pageNum = Math.ceil(courses.length / itemsOnPage);
  const itemsArray = Array.from({ length: pageNum }, (_, index) =>
    courses.slice(index * itemsOnPage, (index + 1) * itemsOnPage)
  );

  const renderCards = itemsArray[pagePosition - 1] || [];

  useEffect(() => {
   
    const getAllCourse = async () => {
      const response = await axios.get(
        `http://localhost:3000/getCourseFilters?language=${language}&level=${level}`
      );

      if (num === "A" || num === "all") {
        const sortedData = sortByDescending(response.data);

        setCourses(sortedData);
      } else {
        const sortedData = sortByAscending(response.data);

        setCourses(sortedData);
      }
    };

    getAllCourse();
  }, [language, level, num]);

  useEffect(() => {
    const getCourses = async () => {
      try { 
    
        const response = await axios.get(`http://localhost:3000/getAllCourses`);

        if (response.data) {
          setCourses(response.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    getCourses();
  }, []);

  const handleChangeLanguage = (e) => {
    const value = e.target.value;

    setLanguage(value);
  };

  const handleChangeLevel = (e) => {
    const value = e.target.value;

    setLevel(value);
  };

  const handleChangeNum = (e) => {
    const value = e.target.value;

    setNum(value);
  };

  return (
    <div className="bg-white text-white flex flex-row w-full h-full items-center justify-center">
      <div className="h-full min-w-[300px] text-black justify-start bg-gradient-to-r bg-[#1E68AD] relative flex flex-col  items-center">
        <div className="w-full h-[200px] flex flex-col items-center justify-center">
          <FaLanguage className="text-[80px] text-yellow-400" />
          <h1 className="text-[25px] m-[10px] text-yellow-400">
            Busca el idioma Ideal para ti
          </h1>
        </div>
        <div className=" w-full h-[450px] flex flex-col items-center justify-evenly ">
          <div className="bg-[#1e417a] w-full h-[50px] flex flex-row items-center justify-evenly">
            <RiMoneyDollarCircleLine className="text-[30px] text-white " />
            <h1 className="text-[20px] text-white">Precio Curso</h1>
          </div>
          <select
            className="h-9 w-[200px] border mt-1 rounded px-4 bg-gray-50"
            name="orderPrice"
            id="orderPrice"
            defaultValue="all"
            onChange={handleChangeNum}
          >
            <option value="all">Precio del Curso</option>
            <option value="A">Min a Max</option>
            <option value="B">Max a Min</option>
          </select>
          <div className="bg-[#1e417a] w-full h-[50px]  flex flex-row items-center justify-evenly">
            <FaRankingStar className="text-[30px] text-white " />
            <h1 className="text-[20px] text-white">Nivel Curso</h1>
          </div>
          <select
            className="h-9 w-[200px] border mt-1 rounded px-4 bg-gray-50"
            name="filterLevel"
            id="filterLevel"
            onChange={handleChangeLevel}
            defaultValue="all"
          >
            <option value="all">Nivel de Idioma</option>
            <option value="Beginner">Principiante</option>
            <option value="Intermediate">Intermedio</option>
            <option value="Advanced">Avanzado</option>
          </select>
          <div className="bg-[#1e417a] w-full h-[50px]  flex flex-row items-center justify-evenly">
            <TbMessageLanguage className="text-[30px] text-white" />
            <h1 className="text-[20px] text-white">Idioma</h1>
          </div>
          <select
            className="h-9 w-[200px] border mt-1 rounded px-4 bg-gray-50"
            name="filterLanguage"
            id="filterLanguage"
            onChange={handleChangeLanguage}
            defaultValue="all"
          >
            <option value="all">Idioma</option>
            <option value="English">Ingles</option>
            <option value="French">Frances</option>
            <option value="German">Aleman</option>
            <option value="Italian">Italiano</option>
            <option value="Dutch">Holandés</option>
            <option value="Portuguese">Portugues</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col items-start justify-star h-full w-[85%] relative">
        <div className=" w-[600px] border-b-[2px] border-[#848484] my-[10px] mx-[90px]">
          <h1 className="text-[35px] text-[#1F1F1F] m-[2px]">{`Cursos Encontrados: ${courses.length}`}</h1>
        </div>
        <div className="flex justify-evenly items-center h-[80%] w-full ">
          {courses &&
            courses.length > 0 &&
            renderCards.map((element, index) => (
              <div className='overflow-hidden h-[80%] w-[30%] rounded-[10px]  transform transition-transform hover:scale-105 duration-500 ease-in-out flex items-center justify-center p-0'>
                <Card course={element} />
              </div>
            ))}
        </div>

        <div className="h-[30px] items-center justify-center flex flex-row w-full">
          <IoIosArrowDropleft
            className={`text-[50px] m-[30px] ${
              pagePosition === 1 ? "cursor-not-allowed" : "cursor-pointer"
            } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
            onClick={prevPage}
            disabled={pagePosition === 1}
          />
          <div className="w-[50px] flex items-center justify-center">
            <h1 className="text-[30px] m-[30px] text-black">{`${pagePosition}`}</h1>
          </div>
          <IoIosArrowDropright
            className={`text-[50px] m-[30px] ${
              pagePosition === pageNum ? "cursor-not-allowed" : "cursor-pointer"
            } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
            onClick={nextPage}
            disabled={pagePosition === pageNum}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeC