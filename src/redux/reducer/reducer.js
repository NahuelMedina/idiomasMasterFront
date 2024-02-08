
import {
    ALL_COURSES,
    COURSE_DETAIL,
    FILTER_LANGUAGE,
    FILTER_LEVEL,
    ORDER_PRICE,
    SEARCH,
} from "../action/actiontypes";

let initialState = {
    courses: [],
    coursesCopy: [],
    courseDetail: [],
    coursesName: [],
};

export const reducer = (state = initialState, { type, payload }) => {
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
            const filteredByLanguage = state.coursesCopy.filter(course => course.language === payload);
            return {
                ...state,
                courses: filteredByLanguage,
            };
        case FILTER_LEVEL:
            const filteredByLevel = state.coursesCopy.filter(course => course.level === payload);
            return {
                ...state,
                courses: filteredByLevel,
            };
        case ORDER_PRICE:
            if (payload === "default") {
                return {
                    ...state,
                    courses: state.coursesCopy, // Revierte al estado inicial
                };
            }
            const sortOrder = payload === "A" ? 1 : -1;
            const sortedArray = [...state.courses].sort((a, b) => sortOrder * (a.price - b.price));
            return {
                ...state,
                courses: sortedArray,
            };
        case SEARCH:
            // Revierte al estado inicial antes de realizar la búsqueda
            return {
                ...state,
                courses: state.coursesCopy,
                coursesName: payload,
            };
        default:
            return state;
    }
};