import React, { useState} from "react";
import validation from "./validation"
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postCourseData } from "../../redux/action/actions";

function CourseForm({ onSubmit }) {
  const [course, setCourse] = useState({
    language: "",
    level: "",
    price: "",
    duration: "",
    schedule: "",
    start_time: "",
    finish_time: "",
    location: "",
    image: "",
    status: true
  });

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleStartDateChange = (date) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      start_time: date
    }));
  };

  const handleEndDateChange = (date) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      finish_time: date
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(course);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log("Datos enviados al hacer clic:", course);
      dispatch(postCourseData(course));
      setSuccessMessage("El curso se ha creado exitosamente."); // Actualizar el mensaje de éxito
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">Crear nuevo curso</h2>
          <p className="text-gray-500 mb-6">Completa el formulario, por favor.</p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
              </div>

                <p className="font-medium text-lg">Detalles del curso</p>
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>

                  <label htmlFor="language">Lenguaje:</label>
                  <select
                    id="language"
                    name="language"
                    value={course.language}
                    onChange={handleChange}
                    required
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  >
                    <option value="">Seleccione un idioma</option>
                    <option value="English">Inglés</option>
                    <option value="French">Francés</option>
                    <option value="German">Alemán</option>
                    <option value="Italian">Italiano</option>
                    <option value="Dutch">Holandés</option>
                    <option value="Portuguese">Portugués</option>
                  </select><br /><br />
                  {errors.language && <p className="text-red-500">{errors.language}</p>}

                  <label htmlFor="level">Nivel:</label>
                  <select
                    id="level"
                    name="level"
                    value={course.level}
                    onChange={handleChange}
                    required
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  >
                    <option value="">Seleccione un nivel</option>
                    <option value="Beginner">Principiante</option>
                    <option value="Intermediate">Intermedio</option>
                    <option value="Advanced">Avanzado</option>
                  </select><br /><br />
                  {errors.level && <p className="text-red-500">{errors.level}</p>}

                  <label htmlFor="price">Precio:</label>
                    <div className="relative">
                      <span className="text-lg absolute top-2.5 left-3">$</span>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={course.price}
                        onChange={handleChange}
                        required
                        placeholder="Precio"
                        className="h-10 border mt-1 rounded pl-10 w-full bg-gray-50"
                      />
                    </div>
                    <br /><br /> 
                    {errors.price && <p className="text-red-500">{errors.price}</p>}
                  <label htmlFor="duration">Duración:</label>
                  <select
                    id="duration"
                    name="duration"
                    value={course.duration}
                    onChange={handleChange}
                    required
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  >
                    <option value="">Seleccione una duración</option>
                    <option value="1 Month">1 Mes</option>
                    <option value="2 Months">2 Meses</option>
                    <option value="3 Months">3 Meses</option>
                    <option value="4 Months">4 Meses</option>
                  </select><br /><br />
                  {errors.duration && <p className="text-red-500">{errors.duration}</p>}

                  <label htmlFor="schedule">Horario:</label>
                  <select
                    id="schedule"
                    name="schedule"
                    value={course.schedule}
                    onChange={handleChange}
                    required
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  >
                    <option value="">Seleccione un horario</option>
                    <option value="On Weekends">Fines de semana</option>
                    <option value="During the week">Durante la semana</option>
                    <option value="Monday-Wednesday-Friday">Lunes, Miércoles, Viernes</option>
                    <option value="Tuesday-Thursday">Martes, Jueves</option>
                  </select><br /><br />
                                     <label htmlFor="start_time">Fecha de inicio:</label>
                     <div className="relative">
                       <DatePicker
                         id="start_date"
                         selected={course.start_time}
                         onChange={handleStartDateChange}
                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 block"
                         dateFormat="dd/MM/yyyy"
                         required
                         autoComplete="off"
                       />
                     </div>
                     <br />

                     <label htmlFor="finish_time">Fecha de finalización:</label>
                     <div className="relative">
                       <DatePicker
                         id="end_date"
                         selected={course.finish_time}
                         onChange={handleEndDateChange}
                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 block"
                         dateFormat="dd/MM/yyyy"
                         required
                         autoComplete="off"
                       />
                     </div>
                     <br /><br />

                  <label htmlFor="location">Ubicación:</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={course.location}
                    onChange={handleChange}
                    required
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  /><br /><br />

                  <label htmlFor="image">URL de la imagen:</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={course.image}
                    onChange={handleChange}
                    required
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  /><br /><br />
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear Curso</button>
                  <div className="text-green-500 mt-8 text-lg">
            {successMessage}
          </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseForm;









// import React, { useState} from "react";
// import validation from "./validation"
// import { useDispatch } from "react-redux";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { postCourseData } from "../../redux/action/actions";

// function CourseForm({ onSubmit }) {
//   const [course, setCourse] = useState({
//     language: "",
//     level: "",
//     price: "",
//     duration: "",
//     schedule: "",
//     start_time: "",
//     finish_time: "",
//     location: "",
//     image: "",
//     status: true
//   });

//   const dispatch = useDispatch();
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState(""); // Nuevo estado para el mensaje de éxito

//   const handleStartDateChange = (date) => {
//     setCourse((prevCourse) => ({
//       ...prevCourse,
//       start_time: date
//     }));
//   };

//   const handleEndDateChange = (date) => {
//     setCourse((prevCourse) => ({
//       ...prevCourse,
//       finish_time: date
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCourse((prevCourse) => ({
//       ...prevCourse,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errors = validation(course);
//     setErrors(errors);
//     if (Object.keys(errors).length === 0) {
//       console.log("Datos enviados al hacer clic:", course);
//       dispatch(postCourseData(course));
//       setSuccessMessage("El curso se ha creado exitosamente."); // Establecer el mensaje de éxito
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
//       <div className="container max-w-screen-lg mx-auto">
//         <div>
//           <h2 className="font-semibold text-xl text-gray-600">Crear nuevo curso</h2>
//           <p className="text-gray-500 mb-6">Completa el formulario, por favor.</p>

//           <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
//             <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
//               <div className="text-gray-600">
//               </div>

//                 <p className="font-medium text-lg">Detalles del curso</p>
//               <div className="lg:col-span-2">
//                 <form onSubmit={handleSubmit}>

//                   <label htmlFor="language">Lenguaje:</label>
//                   <select
//                     id="language"
//                     name="language"
//                     value={course.language}
//                     onChange={handleChange}
//                     required
//                     className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                   >
//                     <option value="">Seleccione un idioma</option>
//                     <option value="English">Inglés</option>
//                     <option value="French">Francés</option>
//                     <option value="German">Alemán</option>
//                     <option value="Italian">Italiano</option>
//                     <option value="Dutch">Holandés</option>
//                     <option value="Portuguese">Portugués</option>
//                   </select><br /><br />
//                   {errors.language && <p className="text-red-500">{errors.language}</p>}

//                   <label htmlFor="level">Nivel:</label>
//                   <select
//                     id="level"
//                     name="level"
//                     value={course.level}
//                     onChange={handleChange}
//                     required
//                     className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                   >
//                     <option value="">Seleccione un nivel</option>
//                     <option value="Beginner">Principiante</option>
//                     <option value="Intermediate">Intermedio</option>
//                     <option value="Advanced">Avanzado</option>
//                   </select><br /><br />
//                   {errors.level && <p className="text-red-500">{errors.level}</p>}

//                   <label htmlFor="price">Precio:</label>
//                     <div className="relative">
//                       <span className="text-lg absolute top-2.5 left-3">$</span>
//                       <input
//                         type="number"
//                         id="price"
//                         name="price"
//                         value={course.price}
//                         onChange={handleChange}
//                         required
//                         placeholder="Precio"
//                         className="h-10 border mt-1 rounded pl-10 w-full bg-gray-50"
//                       />
//                     </div>
//                     <br /><br /> 
//                     {errors.price && <p className="text-red-500">{errors.price}</p>}
//                   <label htmlFor="duration">Duración:</label>
//                   <select
//                     id="duration"
//                     name="duration"
//                     value={course.duration}
//                     onChange={handleChange}
//                     required
//                     className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                   >
//                     <option value="">Seleccione una duración</option>
//                     <option value="1 Month">1 Mes</option>
//                     <option value="2 Months">2 Meses</option>
//                     <option value="3 Months">3 Meses</option>
//                     <option value="4 Months">4 Meses</option>
//                   </select><br /><br />
//                   {errors.duration && <p className="text-red-500">{errors.duration}</p>}

//                   <label htmlFor="schedule">Horario:</label>
//                   <select
//                     id="schedule"
//                     name="schedule"
//                     value={course.schedule}
//                     onChange={handleChange}
//                     required
//                     className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                   >
//                     <option value="">Seleccione un horario</option>
//                     <option value="On Weekends">Fines de semana</option>
//                     <option value="During the week">Durante la semana</option>
//                     <option value="Monday-Wednesday-Friday">Lunes, Miércoles, Viernes</option>
//                     <option value="Tuesday-Thursday">Martes, Jueves</option>
//                   </select><br /><br />
//                   <label htmlFor="start_time">Fecha de inicio:</label>
//                     <div className="relative">
//                       <DatePicker
//                         id="start_date"
//                         selected={course.start_time}
//                         onChange={handleStartDateChange}
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 block"
//                         dateFormat="dd/MM/yyyy"
//                         required
//                         autoComplete="off"

//                       />
//                     </div>
//                     <br />

//                     <label htmlFor="finish_time">Fecha de finalización:</label>
//                     <div className="relative">
//                       <DatePicker
//                         id="end_date"
//                         selected={course.finish_time}
//                         onChange={handleEndDateChange}
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 block"
//                         dateFormat="dd/MM/yyyy"
//                         required
//                         autoComplete="off"

//                       />
//                     </div>
//                     <br /><br />

//                   <label htmlFor="location">Ubicación:</label>
//                   <input
//                     type="text"
//                     id="location"
//                     name="location"
//                     value={course.location}
//                     onChange={handleChange}
//                     required
//                     className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                   /><br /><br />

//                   <label htmlFor="image">URL de la imagen:</label>
//                   <input
//                     type="text"
//                     id="image"
//                     name="image"
//                     value={course.image}
//                     onChange={handleChange}
//                     required
//                     className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                   /><br /><br />

//                   <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear Curso</button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CourseForm;
