import {
  COURSE_DETAIL,
  FILTER_LANGUAGE,
  FILTER_LEVEL,
  ORDER_PRICE,
  SEARCH,
  ALL_COURSES,
  POST_COURSE_FAILURE,
  POST_COURSE_REQUEST,
  POST_COURSE_SUCCESS,
  CART,
  ALLCART,
  ALL_CART_STATUS
} from "./actiontypes";
import axios from "axios";

const url = import.meta.env.VITE_URL_HOST;

export const getAllCourses = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:3000/getAllCourses");
    dispatch({
      type: ALL_COURSES,
      payload: data,
    });
  } catch (error) {
    alert(error);
  }
};

export function getCoursesDetail(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3000/getCourse/${id}`);
      dispatch({
        type: COURSE_DETAIL,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
}
export const filterLanguage = (language) => {
  return {
    type: FILTER_LANGUAGE,
    payload: language,
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
};
export function search(value) {
  return async function (dispatch) {
    try {
      console.log(value);
      const { data } = await axios.get(
        `http://localhost:3000/getCourse/name?name=${value}`
      );
      dispatch({
        type: SEARCH,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
}

export const postCourseRequest = () => ({
  type: POST_COURSE_REQUEST,
});

export const postCourseSuccess = () => ({
  type: POST_COURSE_SUCCESS,
});

export const postCourseFailure = (error) => ({
  type: POST_COURSE_FAILURE,
  payload: error,
});

export const postCourseData = (courseData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/createCourse",
      courseData
    );
    console.log("Solicitud POST exitosa:", response.data);
  } catch (error) {
    console.error("Error al enviar los datos del curso:", error.message);
  }
};

export const postUser = (state) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/createUser",
      state
    );
    alert("Creado con Exito", response.data);
  } catch (error) {
    const message = error.response.data;
    alert(`${message}`);
  }
};

export const getUser = (state) => async (dispatch) => {
  try {
    console.log(state);
    const response = await axios.post("http://localhost:3000/getUser", state);
    alert("Se a conectado", response.data);
  } catch (error) {
    const message = error.response.data.message;
    alert(`${message}`);
  }
};
export const addCart = (data)=>{
  return async function (dispatch) {
    try {
      dispatch({
        type: CART,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
}

export const allCartFunction = (value)=>{
  return async function (dispatch) {
    try {
      dispatch({
        type: ALLCART,
        payload: value,
      });
    } catch (error) {
      alert(error);
    }
  };
}
export const allCartStatus = (value)=>{
  return async function (dispatch) {
    try {
      dispatch({
        type: ALL_CART_STATUS,
        payload: value,
      });
    } catch (error) {
      alert(error);
    }
  };
}