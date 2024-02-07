import { ALL_COURSES, COURSE_DETAIL, FILTER_LANGUAGE, FILTER_LEVEL, ORDER_PRICE } from "../action/actiontypes";

let initialState = {
    courses: [],
    courseDetail: [],
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        // case ALL_COURSES:

        case COURSE_DETAIL:
            return {
                ...state,
                courseDetail: payload
            }
        case FILTER_LANGUAGE:
            return {
                ...state,
                courses: state.courses.filter(course => course.language === payload)
            }
        case FILTER_LEVEL:
            return {
                ...state,
                courses: state.courses.filter(course => course.level === payload)
            }
        case ORDER_PRICE:
            if (payload === "default") {
                return { ...state };
            }
            const sortOrder = payload === "A" ? 1 : -1;
            const sortedArray = [...state.courses].sort((a, b) => sortOrder * (a.price - b.price));
            return {
                ...state,
                courses: sortedArray,
            };








        default: return state;
            break;
    }
}