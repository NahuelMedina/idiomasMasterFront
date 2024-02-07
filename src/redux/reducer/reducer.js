import { COURSE_DETAIL, SEARCH } from "../action/actiontypes";

let initialState= {
    coursesName: [],
    courseDetail : [],

}

export const reducer = (state=initialState, {type, payload})=>{
    switch (type) {
        case COURSE_DETAIL:
            console.log(payload);
            return{
                ...state,
                courseDetail: payload
            }
        case SEARCH:
            return{
                ...state,
                coursesName: payload
            }
    
        default: return state;
            break;
    }
}