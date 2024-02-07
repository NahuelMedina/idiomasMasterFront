import { COURSE_DETAIL, FILTER_LANGUAGE, FILTER_LEVEL, ORDER_PRICE, SEARCH } from "./actiontypes";
import { courses } from "../../Cursos/courses";
import axios from "axios";

export function getCoursesDetail(id) {
  return function (dispatch) {
    try {
      const course = []
      courses.forEach(c => {
        if (c.id === Number(id)) {
          course.push(c)
        }
      })
      if (course.length > 0) {
        console.log(course);
        dispatch({
          type: COURSE_DETAIL,
          payload: course
        });
      } else {
        alert(`No se encontró ningún curso con el ID: ${id}`);
      }
    } catch (error) {
      alert(error)
    }
  }
}
export const filterLenguage = (lenguage) => {
  return {
    type: FILTER_LANGUAGE,
    payload: lenguage,
  };
};

export const filterLevel = (level) => {
  return {
    type: FILTER_LEVEL,
    payload: level,
  };
};
export const OrderPrice = (orden) => {
  return {
    type: ORDER_PRICE,
    payload: orden,
  };
}
export function search(value) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3000/getCourse/name?name=${value}`)
      console.log(data);
      dispatch({
        type: SEARCH,
        payload: data
      });
    } catch (error) {
      alert(error)
    }
  }
}