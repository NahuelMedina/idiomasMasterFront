import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getCoursesDetail } from "../../redux/action/actions"

export const Detail = () =>{

    const params = useParams()
    const dispatch = useDispatch()
    const detail = useSelector(state => state.courseDetail)

  useEffect(()=>{
    dispatch(getCoursesDetail(params.id))
    return ()=>{
      
    }
  },[])

  const d =detail[0];
    return(
        <div>
            <div>
        <img src={d.image} alt={d.lenguage} />
      </div>
      <div>
        <h2>{d.lenguage}</h2>
        <p>{d.level}</p>
        <p>{d.schedule}</p>
        <p>{d.duration}</p>
        <p>{d.location}</p>
      </div>
        </div>
    )
}
