import { COURSE_DETAIL } from "../action/actiontypes";

let initialState= {
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

    
        default: return state;
            break;
    }
}