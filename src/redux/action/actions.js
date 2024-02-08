import { COURSE_DETAIL, FILTER_LANGUAGE, FILTER_LEVEL, ORDER_PRICE, SEARCH, ALL_COURSES } from "./actiontypes";
import { courses } from "../../Cursos/courses";
import axios from "axios";

const url = import.meta.env.VITE_URL_HOST

export const getAllCourses = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:3000/getAllCourses");
    dispatch({
      type: ALL_COURSES,
      payload: data,
    });
  } catch (error) {
    alert(error)
  }
};

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
export const orderPrice = (orden) => {
  return {
    type: ORDER_PRICE,
    payload: orden,
  };
}
export function search(value) {
  return async function (dispatch) {
    try {
      console.log(value);
      const { data } = await axios.get(`http://localhost:3000/getCourse/name?name=${value}`)
      dispatch({
        type: SEARCH,
        payload: data
      });
    } catch (error) {
      alert(error)
    }
  }
}
