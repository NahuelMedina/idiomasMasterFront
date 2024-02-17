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
    const response = await axios.get(`http://localhost:3000/getCourse/${id}`);

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

export const idUser = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/getUserbyId/${id}`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const putUser = async ({
  profile,
  id,
  name,
  lastname,
  email,
  status,
  img,
  password,
  age,
}) => {
  try {
    const response = await axios.put(`http://localhost:3000/putUser`, {
      profile,
      id,
      name,
      lastname,
      email,
      status,
      img,
      password,
      age,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const userCourses = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/getUserCourses/${id}`
    );

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const userPayments = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/getUserPayment/${id}`
    );

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const idReview = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/getReviews/${id}`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const putReview = async ({ reply, view, reviewId }) => {
  try {
    const response = await axios.put(`http://localhost:3000/putReview`, {
      reply,
      view,
      reviewId,
    });

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
