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
  FILTERED_COURSES,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from "./actiontypes";
import axios from "axios";
const URL = import.meta.env.VITE_URL_HOST;
export const getAllCourses = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/getAllCourses`);
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
      const { data } = await axios.get(`${URL}/getCourse/${id}`);
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
      const { data } = await axios.get(`${URL}/getCourse/name?name=${value}`);
      console.log(data);
      if (Array.isArray(data)) {
        dispatch({
          type: SEARCH,
          payload: [data, value],
        });
      } else {
        alert("No se encontraron resultados");
      }
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
    const response = await axios.post(`${URL}/createCourse`, courseData);
    console.log("Solicitud POST exitosa:", response.data);
  } catch (error) {
    console.error("Error al enviar los datos del curso:", error.message);
  }
};

export const postUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/createUser`, userData);
    alert("Usuario creado con Exito", response.data);
  } catch (error) {
    const message = error.response.data;
    alert(`${message}`);
  }
};


export const getUser = (userData) => async (dispatch) => {
  try {
    console.log("Datos de usuario:", userData);
    dispatch({ type: GET_USER_REQUEST });

    const response = await axios.post(`${URL}/getUser`, userData);
    console.log("Respuesta del servidor:", response.data);
    
    // Verificamos si el usuario se ha autenticado correctamente
    if (response.data) {
      dispatch({ type: GET_USER_SUCCESS, payload: response.data });
      alert("¡Se ha iniciado sesión exitosamente!");
    } else {
      dispatch({ type: GET_USER_FAILURE, payload: "No se ha podido iniciar sesión." });
      alert("¡No se ha podido iniciar sesión!");
    }
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
    alert("Ha ocurrido un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
  }
};


export const filteredCourses = (data) => {
  return {
    type: FILTERED_COURSES,
    payload: data,
  };
};

