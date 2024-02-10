import {
    ALL_COURSES,
    COURSE_DETAIL,
    FILTERED_COURSES,
    FILTER_LANGUAGE,
    FILTER_LEVEL,
    ORDER_PRICE,
    SEARCH,
    CART,
    ALLCART,
    ALL_CART_STATUS
} from "../action/actiontypes";

let initialState = {
    courses: [],
    coursesCopy: [],
    courseDetail: [],
    coursesName: [],
    coursesCart: [],
    allCart: [],
    statusCart: false,
    bito: false

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
            } 
           
        case FILTER_LANGUAGE:
            const filteredByLanguage = state.coursesCopy.filter(course => course.language === payload);
            return {
                ...state,
                courses: filteredByLanguage,
                coursesName: filteredByLanguage,
            };
        case FILTER_LEVEL:
            const filteredByLevel = state.coursesCopy.filter(course => course.level === payload);
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
            const sortedArray = [...state.courses].sort((a, b) => sortOrder * (a.price - b.price));
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
                coursesName: payload,
            };

        case FILTERED_COURSES: 

        console.log(payload)

        return {
            ...state,
            courses: payload
        }
        case CART:
                return{
                ...state,
                courses: state.coursesCopy,
                coursesCart: [payload],
                bito: true
            }
        case ALLCART:
            let aux = [...state.coursesCart, payload]
            function eliminarDuplicados(aux) {
                return Array.from(new Set(aux));
            }
            let aux2 = eliminarDuplicados(aux)
            return{
                ...state,
                courses: state.coursesCopy,
                allCart: aux2
            }
        case ALL_CART_STATUS:
            const bito2 = [...state.allCart].some(obj => obj === payload)
            console.log(bito2);
            if(state.bito){
                return{
                    ...state,
                    courses: state.coursesCopy,
                    statusCart: true                
                }
            } else {
                return{
                    ...state,
                    courses: state.coursesCopy,
                    statusCart: false               
                }
            }
          
        default:
            return state;
    }
};

export default reducer; 
