import { COURSE_DETAIL } from "./actiontypes";
import  {courses}  from "../../Cursos/courses";


export function getCoursesDetail (id) {
    return function(dispatch){
        try {
            const course = []
            courses.forEach( c => {
              if(c.id === Number(id)) {
                course.push(c) 
                return
              }
            })
            if (course) {
              dispatch({
                type: COURSE_DETAIL,
                payload: course
              });
            } else {
              /*alert(`No se encontró ningún curso con el ID: ${id}`);*/
            }
        } catch (error) {
            alert(error)
        }
    }
}