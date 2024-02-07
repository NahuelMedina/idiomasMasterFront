import { useState } from "react";
import { Card } from "../Card/Card";
import Page from "./Page";

export function FalsoHome() {

    //const courses = useSelector((state) => state.allCourses);  
    const courses = [
        {
            id: 1,
            lenguage: "Inglés",
            company_course: "juan",
            level: "Principiante",
            instructor: "John Smith",
            schedule: "Lunes y Miércoles, 18:00 - 20:00",
            location: "Centro de Idiomas ABC",
            image: "https://www.civitatis.com/blog/wp-content/uploads/2023/03/shutterstock_1585685068-1920x1280.jpg",
            duration: "1 Month",
        },
        {
            id: 2,
            lenguage: "Portuguese",
            company_course: "tr",
            level: "Principiante",
            instructor: "John Smith",
            schedule: "Lunes y Miércoles, 18:00 - 20:00",
            location: "Centro de Idiomas ABC",
            image: "https://www.civitatis.com/blog/wp-content/uploads/2023/03/shutterstock_1585685068-1920x1280.jpg",
            duration: "1 Month",
        },
        {
            id: 3,
            lenguage: "Italiano",
            company_course: "juan",
            level: "Principiante",
            instructor: "John Smith",
            schedule: "Lunes y Miércoles, 18:00 - 20:00",
            location: "Centro de Idiomas ABC",
            image: "https://www.civitatis.com/blog/wp-content/uploads/2023/03/shutterstock_1585685068-1920x1280.jpg",
            duration: "1 Month",
        },
        {
            id: 4,
            lenguage: "Francés",
            company_course: "juan",
            level: "Principiante",
            instructor: "John Smith",
            schedule: "Lunes y Miércoles, 18:00 - 20:00",
            location: "Centro de Idiomas ABC",
            image: "https://www.civitatis.com/blog/wp-content/uploads/2023/03/shutterstock_1585685068-1920x1280.jpg",
            duration: "1 Month",
        },
        {
            id: 5,
            lenguage: "Aleman",
            company_course: "juan",
            level: "Principiante",
            instructor: "John Smith",
            schedule: "Lunes y Miércoles, 18:00 - 20:00",
            location: "Centro de Idiomas ABC",
            image: "https://www.civitatis.com/blog/wp-content/uploads/2023/03/shutterstock_1585685068-1920x1280.jpg",
            duration: "1 Month",
        },
        {
            id: 6,
            lenguage: "Chino",
            company_course: "juan",
            level: "Principiante",
            instructor: "John Smith",
            schedule: "Lunes y Miércoles, 18:00 - 20:00",
            location: "Centro de Idiomas ABC",
            image: "https://www.civitatis.com/blog/wp-content/uploads/2023/03/shutterstock_1585685068-1920x1280.jpg",
            duration: "1 Month",
        },
        {
            id: 7,
            lenguage: "Japonés",
            company_course: "juan",
            level: "Principiante",
            instructor: "John Smith",
            schedule: "Lunes y Miércoles, 18:00 - 20:00",
            location: "Centro de Idiomas ABC",
            image: "https://www.civitatis.com/blog/wp-content/uploads/2023/03/shutterstock_1585685068-1920x1280.jpg",
            duration: "1 Month",
        },
        {
            id: 8,
            lenguage: "Tailandes",
            company_course: "juan",
            level: "Principiante",
            instructor: "John Smith",
            schedule: "Lunes y Miércoles, 18:00 - 20:00",
            location: "Centro de Idiomas ABC",
            image: "https://www.civitatis.com/blog/wp-content/uploads/2023/03/shutterstock_1585685068-1920x1280.jpg",
            duration: "1 Month",
        },
        {
            id: 9,
            lenguage: "Latín",
            company_course: "juan",
            level: "Principiante",
            instructor: "John Smith",
            schedule: "Lunes y Miércoles, 18:00 - 20:00",
            location: "Centro de Idiomas ABC",
            image: "https://www.civitatis.com/blog/wp-content/uploads/2023/03/shutterstock_1585685068-1920x1280.jpg",
            duration: "1 Month",
        },
        {
            id: 10,
            lenguage: "Español",
            company_course: "juan",
            level: "Principiante",
            instructor: "John Smith",
            schedule: "Lunes y Miércoles, 18:00 - 20:00",
            location: "Centro de Idiomas ABC",
            image: "https://www.civitatis.com/blog/wp-content/uploads/2023/03/shutterstock_1585685068-1920x1280.jpg",
            duration: "1 Month",
        },
        {
            id: 11,
            lenguage: "Árabe",
            company_course: "juan",
            level: "Principiante",
            instructor: "John Smith",
            schedule: "Lunes y Miércoles, 18:00 - 20:00",
            location: "Centro de Idiomas ABC",
            image: "https://www.civitatis.com/blog/wp-content/uploads/2023/03/shutterstock_1585685068-1920x1280.jpg",
            duration: "1 Month",
        },
        {
            id: 12,
            lenguage: "Hindi",
            company_course: "juan",
            level: "Principiante",
            instructor: "John Smith",
            schedule: "Lunes y Miércoles, 18:00 - 20:00",
            location: "Centro de Idiomas ABC",
            image: "https://www.civitatis.com/blog/wp-content/uploads/2023/03/shutterstock_1585685068-1920x1280.jpg",
            duration: "1 Month",
        },
        {
            id: 13,
            lenguage: "Holandés",
            company_course: "juan",
            level: "Principiante",
            instructor: "John Smith",
            schedule: "Lunes y Miércoles, 18:00 - 20:00",
            location: "Centro de Idiomas ABC",
            image: "https://www.civitatis.com/blog/wp-content/uploads/2023/03/shutterstock_1585685068-1920x1280.jpg",
            duration: "1 Month",
        },
        {
            id: 14,
            lenguage: "Turco",
            company_course: "juan",
            level: "Principiante",
            instructor: "John Smith",
            schedule: "Lunes y Miércoles, 18:00 - 20:00",
            location: "Centro de Idiomas ABC",
            image: "https://www.civitatis.com/blog/wp-content/uploads/2023/03/shutterstock_1585685068-1920x1280.jpg",
            duration: "1 Month",
        },
        {
            id: 15,
            lenguage: "Sueco",
            company_course: "juan",
            level: "Principiante",
            instructor: "John Smith",
            schedule: "Lunes y Miércoles, 18:00 - 20:00",
            location: "Centro de Idiomas ABC",
            image: "https://www.civitatis.com/blog/wp-content/uploads/2023/03/shutterstock_1585685068-1920x1280.jpg",
            duration: "1 Month",
        },

    ];


    /*Paginado*/
    const [currentPage, setCurrentPage] = useState(1);
    const [coursePerPage, setCoursePerPage] = useState(3);
    const indexLastCourse = currentPage * coursePerPage;
    const indexFirstCourse = indexLastCourse - coursePerPage; // 12 - 12 = 0 -> me da el indice del primer curso.
    const currentCourses = courses.slice(indexFirstCourse, indexLastCourse);
    const page = (pageNum) => {
        setCurrentPage(pageNum); //seteo el estado, y esto hace que cambie el valor del resto de mis constantes del paginado.
    };

    return (
        <div class="bg-black text-white flex justify-center">
            <div class='absolute top-20 right-38 '>
                <Page
                    setCurrentPage={setCurrentPage}
                    coursePerPage={coursePerPage}
                    courses={courses.length}
                    page={page}
                    current={currentPage} />
            </div>


            <div class='p-16'>

                {courses.length > 0 ? (
                    currentCourses.map((course) => <Card key={course.id} course={course} />)
                ) : (
                    <div>
                        <h2>Loading...</h2>
                    </div>
                )}

            </div>





            <div class="absolute bottom-6 right-38">
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
