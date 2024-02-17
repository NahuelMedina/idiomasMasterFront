import {
  ALL_COURSES,
  COURSE_DETAIL,
  FILTERED_COURSES,
  FILTER_LANGUAGE,
  FILTER_LEVEL,
  ORDER_PRICE,
  SEARCH,
  ADMINPRODUCT,
  ADMINUSER,
  SET_USER_DATA
} from "../action/actiontypes";

let initialState = {
  courses: [],
  coursesCopy: [],
  courseDetail: [],
  coursesName: [],
  courseLanguage: "",
  favorites: [],
  allFavorites: [],
  userData: {
    email: "",
    password: "",
  },
  loading: false,
  error: null,
  user: {
    loading: false,
  },
  adminProduct: null,
  adminUser: null
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_COURSES:
      return {
        ...state,
        courses: payload,
        coursesCopy: payload, // Actualiza la copia de seguridad de los cursos
      };
    case COURSE_DETAIL:
      return {
        ...state,
        courseDetail: payload,
      };

    case FILTER_LANGUAGE:
      const filteredByLanguage = state.coursesCopy.filter(
        (course) => course.language === payload
      );
      return {
        ...state,
        courses: filteredByLanguage,
        coursesName: filteredByLanguage,
      };
    case FILTER_LEVEL:
      const filteredByLevel = state.coursesCopy.filter(
        (course) => course.level === payload
      );
      return {
        ...state,
        courses: filteredByLevel,
        coursesName: filteredByLevel,
      };
    case ORDER_PRICE:
      if (payload === "default") {
        return {
          ...state,
          courses: state.coursesCopy, // Revierte al estado inicial
        };
      }
      const sortOrder = payload === "A" ? 1 : -1;
      const sortedArray = [...state.courses].sort(
        (a, b) => sortOrder * (a.price - b.price)
      );
      return {
        ...state,
        courses: sortedArray,
        coursesName: sortedArray,
      };
    case SEARCH:
      // Revierte al estado inicial antes de realizar la búsqueda
      return {
        ...state,
        courses: state.coursesCopy,
        coursesName: payload[0],
        courseLanguage: payload[1],
      };

    case FILTERED_COURSES:
      return {
        ...state,
        courses: payload,
      };

    case ADMINPRODUCT:
        return{
            ...state,
            adminProduct: payload
        };

        case ADMINUSER:
        return{
            ...state,
            adminUser: payload
        }

        case SET_USER_DATA:
          return {
            ...state,
            userData: action.payload,
          };

    default:
      return state;
  }
};

export default reducer;
