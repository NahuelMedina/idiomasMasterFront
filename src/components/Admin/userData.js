import axios from "axios";

export const productData = async () => {
  try {

    const response = await axios.get(`http://localhost:3000/getAllCourses`)
   
    if(response){

        return response
    }
    
  } catch (error) {
    throw new Error(error.message);
  }
};

export const usersData = async () => {
    try {
  
      const response = await axios.get(`http://localhost:3000/getAllUsers`)
     
      if(response){
  
          return response
      }
      
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const paymentData = async () => {
    try {
  
      const response = await axios.get(`http://localhost:3000/getAllPayments`)
     
      if(response){
  
          return response
      }
      
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const reviewData = async () => {
    try {
  
      const response = await axios.get(`http://localhost:3000/getAllReviews`)
     
      if(response){
  
          return response
      }
      
    } catch (error) {
      throw new Error(error.message);
    }
  };
