import axios from "axios";

export const productData = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/getAllCourses`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const usersData = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/getAllUsers`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const paymentData = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/getAllPayments`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const reviewData = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/getAllReviews`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const idProduct = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/getCourseId/${id}`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const putProduct = async ({
  id,
  language,
  level,
  price,
  duration,
  schedule,
  location,
  image,
  status,
  start_time,
  finish_time,
}) => {
  console.log(id);
  try {
    const response = await axios.put(`http://localhost:3000/putCourse`, {
      id,
      language,
      level,
      price,
      duration,
      schedule,
      location,
      image,
      status,
      start_time,
      finish_time,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
