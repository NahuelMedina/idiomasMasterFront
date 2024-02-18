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
  ADMINPRODUCT,
  ADMINUSER,
  ADMINREVIEW,
  SET_USER_DATA,
  ALL_USERS,
  USER_COURSES
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

export const postThirdPartyUser = (user) => async (dispatch) => {
  try {
    const userData = {
      name: user.given_name,
      lastname: user.family_name,
      email: user.email,
      img: user.picture,
    };
console.log("ESTO ES USERDATA EN THIRPARTY", userData)
    const response = await axios.post(`${URL}/createUser`, userData);
    alert("Usuario creado con éxito", response.data);
  } catch (error) {
    const message = error.response.data;
    alert(`${message}`);
  }
};


export const getUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/getUser`, userData);
    dispatch({
      type: SET_USER_DATA,
      payload: response,
    });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    const message = error.response.data.message;
    alert(`${message}`);
  }
};



export const filteredCourses = (data) => {
  return {
    type: FILTERED_COURSES,
    payload: data,
  };
};


export const adminProduct = (data) => {
  return {
    type: ADMINPRODUCT,
    payload: data,
  };
};

export const adminUser = (data) => {
  return {
    type: ADMINUSER,
    payload: data,
  };
};

export const adminReview = (data) => {
  return {
    type: ADMINREVIEW,
    payload: data,
  };
};



export function getAllUsers() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/getAllUsers`);
      dispatch({
        type: ALL_USERS,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
}


export function getUserCourses(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/getUserCourses/${id}`);
      dispatch({
        type: USER_COURSES,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
}


