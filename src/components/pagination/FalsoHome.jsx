import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import Page from "./Page";
import {
  filterLanguage,
  filterLevel,
  getAllCourses,
  orderPrice,
} from "../../redux/action/actions";

export function FalsoHome() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const search = useSelector((state) => state.coursesName);

  /*Paginado*/
  const [currentPage, setCurrentPage] = useState(1);
  const [coursePerPage, setCoursePerPage] = useState(3);
  const indexLastCourse = currentPage * coursePerPage;
  const indexFirstCourse = indexLastCourse - coursePerPage; // 12 - 12 = 0 -> me da el indice del primer curso.
  const currentCourses = courses.slice(indexFirstCourse, indexLastCourse);
  const currentSearch = search.slice(indexFirstCourse, indexLastCourse);
  const page = (pageNum) => {
    setCurrentPage(pageNum); //seteo el estado, y esto hace que cambie el valor del resto de mis constantes del paginado.
  };
  useEffect(() => {
    if (courses.length === 0) {
      dispatch(getAllCourses());
    }
  }, [dispatch]);

  const handleOrderPrice = (e) => {
    e.preventDefault();
    dispatch(orderPrice(e.target.value));
    setCurrentPage(1);
  };
  const handleFilterLevel = (e) => {
    e.preventDefault();
    dispatch(filterLevel(e.target.value));
    setCurrentPage(1);
  };
  const handleFilterLanguage = (e) => {
    e.preventDefault();
    dispatch(filterLanguage(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="bg-black text-white flex ">
      <div className="absolute top-15 flex left-96 m-4">
        <Page
          setCurrentPage={setCurrentPage}
          coursePerPage={coursePerPage}
          courses={courses.length}
          page={page}
          current={currentPage}
        />
      </div>
      <div className="rounded-lg  h-6 flex text-white justify-between m-4  ">
       <div className="">

        <select
          className="bg-gray-900 rounded-lg m-1 hover:bg-gray-700 transition-colors duration-300 shadow-md px-1 py-1 border border-gray-700"
          name="orderPrice"
          id="orderPrice"
          defaultValue="default"
          onChange={(e) => handleOrderPrice(e)}
        >
          <option value="default">Precio</option>
          <option value="A">Min a Max</option>
          <option value="B">Max a Min</option>
        </select>
      </div>
      <div>
        <select
          className="bg-gray-900  rounded-lg m-1  hover:bg-gray-700 transition-colors duration-300 shadow-md px-1 py-1 border border-gray-700"
          name="filterLevel"
          id="filterLevel"
          onChange={(e) => handleFilterLevel(e)}
          defaultValue="all"
        >
          <option value="all">Dificultad</option>
          <option value="Beginner">Principiante</option>
          <option value="Intermediate">Intermedio</option>
          <option value="Advanced">Avanzado</option>
        </select>
        </div>
        <div>
        <select
          className="bg-gray-900 rounded-lg m-1  hover:bg-gray-700 transition-colors duration-300 shadow-md px-1 py-1 border border-gray-700"
          name="filterLanguage"
          id="filterLanguage"
          onChange={(e) => handleFilterLanguage(e)}
          defaultValue="all"
        >
          <option value="all">Idiomas</option>
          <option value="English">Ingles</option>
          <option value="French">Frances</option>
          <option value="German">Aleman</option>
          <option value="Italian">Italiano</option>
          <option value="Dutch">Holandés</option>
          <option value="Portuguese">Portugues</option>
        </select>
        </div>
      </div>

      <div className="flex justify-center bg-black items-center m-12">
        {search.length > 0 ? (
          currentSearch.map((course, index) => (
            <div key={index} className="p-6 ">
              <Card course={course} />
            </div>
          ))
        ) : courses.length > 0 ? (
          currentCourses.map((course, index) => (
            <div key={index} className="p-6 ">
              <Card course={course} />
            </div>
          ))
        ) : (
          <div>
            <h2>Loading...</h2>
          </div>
        )}
      </div>

      <div className="absolute bottom-6 flex left-96 m-4 ">
        <Page
          setCurrentPage={setCurrentPage}
          coursePerPage={coursePerPage}
          courses={courses.length}
          page={page}
          current={currentPage}
        />
      </div>
    </div>
  );
}
