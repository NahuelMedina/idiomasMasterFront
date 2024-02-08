import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import Page from "./Page";
import { getAllCourses } from "../../redux/action/actions";

export function FalsoHome() {


    const dispatch = useDispatch()
    const courses = useSelector((state) => state.courses);
    /*Paginado*/
    const [currentPage, setCurrentPage] = useState(1);
    const [coursePerPage, setCoursePerPage] = useState(3);
    const indexLastCourse = currentPage * coursePerPage;
    const indexFirstCourse = indexLastCourse - coursePerPage; // 12 - 12 = 0 -> me da el indice del primer curso.
    const currentCourses = courses.slice(indexFirstCourse, indexLastCourse);
    const page = (pageNum) => {
        setCurrentPage(pageNum); //seteo el estado, y esto hace que cambie el valor del resto de mis constantes del paginado.
    };
    useEffect(() => {
        if (courses.length === 0) {
            dispatch(getAllCourses());
        }
    }, []);
    return (

        <div className="bg-black text-white flex justify-center">
            <div className='absolute top-20 right-38 '>
                <Page
                    setCurrentPage={setCurrentPage}
                    coursePerPage={coursePerPage}
                    courses={courses.length}
                    page={page}
                    current={currentPage} />
            </div>


            <div className='p-16'>

                {courses.length > 0 ? (
                    currentCourses.map((course, index) => <Card key={index} course={course} />)
                ) : (
                    <div>
                        <h2>Loading...</h2>
                    </div>
                )}

            </div>





            <div className="absolute bottom-6 right-38">
                <Page
                    setCurrentPage={setCurrentPage}
                    coursePerPage={coursePerPage}
                    courses={courses.length}
                    page={page}
                    current={currentPage} />
            </div>
        </div>

    );

}
