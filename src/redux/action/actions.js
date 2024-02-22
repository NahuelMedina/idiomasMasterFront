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
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SET_USER_DATA,
  ALL_USERS,
  USER_COURSES,
  POST_USER_SUCCESS,
  POST_USER_FAIL,
  GET_CART,
  ADD_CART,
  DELETE_CART,
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
    dispatch({
      type: POST_USER_SUCCESS,
      payload: response,
    });
    //alert("Usuario creado con Exito", response.data);
  } catch (error) {
    const message = error.response.data;
    dispatch({
      type: POST_USER_FAIL,
      payload: message,
    });
    
    //alert(`${message}`);
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
    console.log("ESTO ES USERDATA EN THIRPARTY", userData);
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
    console.log("Respuesta del servidor:", response.data);

    localStorage.setItem("userData", JSON.stringify(response.data));

    dispatch({
      type: GET_USER_SUCCESS,
      payload: response.data,
    });

    //alert("Se ha conectado");
    
  } catch (error) {
    console.error("Error al obtener usuario:", error);

    dispatch({
      type: GET_USER_FAILURE,
      payload: error.payload.data.message,
    });

    alert(error.payload.data.message);
  }
};

export const updateUser = (changedFields) => async (dispatch) => {
  try {
    console.log(changedFields, "ESTO ENVIA LA ACTION UPDATEUSER");
    const response = await axios.put(`${URL}/putUser`, changedFields);
    console.log("Respuesta del servidor al guardar cambios:", response.data);
    // Dispara una acción para actualizar los datos en el store local de Redux
    // Aquí podrías dispatchear otra acción si necesitas actualizar otros datos en el store
  } catch (error) {
    console.error("Error al guardar cambios:", error);
    // Podrías dispatchear otra acción para manejar el error si es necesario
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

export const createPreference = async (product) => {
  try {
    const { data } = await axios.post(`${URL}/createPreference`, product);
    window.location.href = data;
  } catch (error) {
    console.log(error.message);
  }
};

export const setUserdata = (user) => {

  return {
    type: SET_USER_DATA,
    payload: user,
  };
}

export function getCartDB(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/getCart/${id}`);
      dispatch({
        type: GET_CART,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
}
export function addCart(cart) {
  return async function (dispatch) {
    try {
      const { data } = await axios.put(`${URL}/addCartProduct`, cart);
      dispatch({
        type: ADD_CART,
        payload: data,
      });
    } catch (error) {
    }
  };
}
export function deleteCart(cart) {
  return async function (dispatch) {
    try {
      const { data } = await axios.put(`${URL}/deleteCartProduct`, cart);
      dispatch({
        type: DELETE_CART,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
}