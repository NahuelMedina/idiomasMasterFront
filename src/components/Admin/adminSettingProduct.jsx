import React, { useState } from "react";
import validation from "../CourseForm/validation";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoSearchCircle } from "react-icons/io5";
import { idProduct, putProduct } from "./userData";
import { FaCircle } from "react-icons/fa";

export default function AdminSettingProduct() {
  const initialCourseState = {
    language: "",
    level: "",
    price: "",
    duration: "",
    schedule: "",
    start_time: "",
    finish_time: "",
    location: "",
    image: "",
    status: true,
  };

  const [course, setCourse] = useState(initialCourseState);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // Estado para almacenar la vista previa de la imagen
  const [searchTerm, setSearchTerm] = useState("");

  // Restablecer el formulario a su estado inicial
  const resetForm = () => {
    setCourse(initialCourseState);
    setErrors({});
    setSuccessMessage("");
    setImagePreview(null); // Limpiar la vista previa de la imagen
  };

  const handleFetch = async (event) => {
    event.preventDefault();

    const response = await idProduct(searchTerm);

    if (response.data) {
      setCourse(response.data);
      setImagePreview(response.data.image);
    }

    setSearchTerm("");
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleStartDateChange = (date) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      start_time: date,
    }));
  };

  const handleEndDateChange = (date) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      finish_time: date,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "status" ? value === "true" : value === "false" ? false : value;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: newValue,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setCourse((prevCourse) => ({
          ...prevCourse,
          image: reader.result,
        }));
        setImagePreview(reader.result); // Establecer la vista previa de la imagen
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validation(course);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        await putProduct({
          id: course._id, // Usar el ID del curso actual
          language: course.language,
          level: course.level,
          price: course.price,
          duration: course.duration,
          schedule: course.schedule,
          location: course.location,
          image: course.image,
          status: course.status,
          start_time: course.start_time,
          finish_time: course.finish_time,
        });
        window.alert("El curso se ha actualizado exitosamente.");
        resetForm(); // Restablecer el formulario después de enviar los datos
      } catch (error) {
        console.error("Error al actualizar el curso:", error.message);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col border-[#151139] border-[1px] overflow-croll">
      <div className="w-full h-[40px] bg-[#151139]  flex flex-row items-center">
        <p className=" text-white ml-6 text-[20px]">
          Search & Updated a Product
        </p>
      </div>
      <div className="w-full h-[20%] bg-[#151139]  flex flex-row ">
        <div className="h-full w-[40%] ">
          <div className="w-full h-full pl-[20px] bg-[#151139] flex flex-row items-center">
            <input
              placeholder="Search Product by ID"
              type="search"
              value={searchTerm}
              className="w-[400px] h-[40px]  rounded-lg text-black px-6 py-3 text-base hover:border-[#7aacfd] cursor-pointer transition mr-[15px]"
              onChange={handleSearch}
            />
            <IoSearchCircle
              className="text-[50px] text-white cursor-pointer transition-transform transform-gpu hover:shadow-white active:scale-95"
              type="submit"
              onClick={handleFetch}
            />
          </div>
        </div>

        {course._id && course._id.length > 0 && (
          <div className="h-full w-[60%] flex items-center justify-center bg-[#373a6c] ">
            <div className="h-full w-[50%] flex items-center justify-center">
              <h1 className="text-yellow-500 text-[20px]">{`Product Id: ${course._id}`}</h1>
            </div>

            <div className="h-full w-[50%] flex items-center justify-center">
              <div className="h-full w-[90%]  flex flex-row items-center justify-center">
                <select
                  id="status"
                  name="status"
                  value={course.status}
                  onChange={handleChange}
                  required
                  className="h-10 w-[40%] border mt-1 rounded px-4 bg-gray-50"
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
                {course.status ? (
                  <div className="h-full w-[30%]  flex flex-row items-center justify-center">
                    <FaCircle className="text-[20px] ml-[5px] text-green-400" />
                  </div>
                ) : (
                  <div className="h-full w-[30%]  flex flex-row items-center justify-center">
                    <FaCircle className="text-[20px] ml-[5px] text-red-500" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-[#282a54] w-full h-[96%] grid grid-cols-3 gap-[5px] p-[5px]"
      >
        <div className="bg-[#282a54] w-full h-full grid grid-rows-4 gap-[5px] rounded-[10px]">
          <div className="w-full h-full pl-[20px] rounded-[10px] bg-[#373a6c] ">
            <div className="w-full h-[25%] flex items-center">
              <label htmlFor="language" className="text-white text-[18px]">
                Lenguaje
              </label>
            </div>
            <div className="w-full h-[50%] flex items-center">
              <select
                id="language"
                name="language"
                value={course.language}
                onChange={handleChange}
                required
                className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
              >
                <option value="">Seleccione un idioma</option>
                <option value="English">Inglés</option>
                <option value="French">Francés</option>
                <option value="German">Alemán</option>
                <option value="Italian">Italiano</option>
                <option value="Dutch">Holandés</option>
                <option value="Portuguese">Portugués</option>
              </select>
            </div>
            <div className="w-full h-[25%] flex items-center">
              {errors.language && (
                <p className="text-red-500">{errors.language}</p>
              )}
            </div>
          </div>
          <div className="w-full h-full bg-[#373a6c] pl-[20px] rounded-[10px]">
            <div className="w-full h-[25%] flex items-center">
              <label htmlFor="level" className="text-white text-[18px]">
                Nivel
              </label>
            </div>
            <div className="w-full h-[50%] flex items-center">
              <select
                id="level"
                name="level"
                value={course.level}
                onChange={handleChange}
                required
                className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
              >
                <option value="">Seleccione un nivel</option>
                <option value="Beginner">Principiante</option>
                <option value="Intermediate">Intermedio</option>
                <option value="Advanced">Avanzado</option>
              </select>
            </div>
            <div className="w-full h-[25%] flex items-center">
              {errors.level && <p className="text-red-500">{errors.level}</p>}
            </div>
          </div>

          <div className="w-full h-full bg-[#373a6c] pl-[20px] rounded-[10px]">
            <div className="w-full h-[25%] flex items-center">
              <label htmlFor="language" className="text-white text-[18px]">
                Precio
              </label>
            </div>
            <div className="w-full h-[50%] flex items-center">
              <input
                type="number"
                id="price"
                name="price"
                value={course.price}
                onChange={handleChange}
                required
                placeholder="Precio entre 25 y 500 USD"
                className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
              />
            </div>
            <div className="w-full h-[25%] flex items-center">
              {errors.price && <p className="text-red-500">{errors.price}</p>}
            </div>
          </div>
          <div className="w-full h-full bg-[#373a6c] pl-[20px] rounded-[10px]">
            <div className="w-full h-[25%] flex items-center">
              <label htmlFor="language" className="text-white text-[18px]">
                Duración
              </label>
            </div>
            <div className="w-full h-[50%] flex items-center">
              <select
                id="duration"
                name="duration"
                value={course.duration}
                onChange={handleChange}
                required
                className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
              >
                <option value="">Seleccione una duración</option>
                <option value="1 Month">1 Mes</option>
                <option value="2 Months">2 Meses</option>
                <option value="3 Months">3 Meses</option>
                <option value="4 Months">4 Meses</option>
              </select>
            </div>
            <div className="w-full h-[25%] flex items-center">
              {errors.duration && (
                <p className="text-red-500">{errors.duration}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#282a54] w-full h-full grid grid-rows-4 gap-[5px] rounded-[10px]">
          <div className="w-full h-full bg-[#373a6c] pl-[20px] rounded-[10px]">
            <div className="w-full h-[25%] flex items-center">
              <label htmlFor="schedule" className="text-white text-[18px]">
                Horario
              </label>
            </div>
            <div className="w-full h-[50%] flex items-center">
              <select
                id="schedule"
                name="schedule"
                value={course.schedule}
                onChange={handleChange}
                required
                className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
              >
                <option value="">Seleccione un horario</option>
                <option value="On Weekends">Fines de semana</option>
                <option value="During the week">Durante la semana</option>
                <option value="Monday-Wednesday-Friday">
                  Lunes, Miércoles, Viernes
                </option>
                <option value="Tuesday-Thursday">Martes, Jueves</option>
              </select>
            </div>
            <div className="w-full h-[25%] flex items-center"></div>
          </div>

          <div className="w-full h-full bg-[#373a6c] pl-[20px] rounded-[10px]">
            <div className="w-full h-[25%] flex items-center">
              <label htmlFor="start_time" className="text-white text-[18px]">
                Ubicacion
              </label>
            </div>
            <div className="w-full h-[50%] flex items-center">
              <select
                type="text"
                id="location"
                name="location"
                value={course.location}
                onChange={handleChange}
                required
                className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
              >
                <option value="">Seleccione Pais Inscrito</option>
                <option value="Argentina">Argentina</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Bélgica">Bélgica</option>
                <option value="Brasil">Brasil</option>
                <option value="Canadá">Canadá</option>
                <option value="Colombia">Colombia</option>
                <option value="Dinamarca">Dinamarca</option>
                <option value="España">España</option>
                <option value="Estados_Unidos">Estados Unidos</option>
                <option value="Francia">Francia</option>
                <option value="Irlanda">Irlanda</option>
                <option value="Italia">Italia</option>
                <option value="Noruega">Noruega</option>
                <option value="Holanda">Holanda</option>
                <option value="Portugal">Portugal</option>
                <option value="Suecia">Suecia</option>
                <option value="Suiza">Suiza</option>
              </select>
            </div>
            <div className="w-full h-[25%] flex items-center"></div>
          </div>

          <div className="w-full h-full bg-[#373a6c] pl-[20px] rounded-[10px]">
            <div className="w-full h-[25%] flex items-center">
              <label htmlFor="start_time" className="text-white text-[18px]">
                Fecha de inicio
              </label>
            </div>
            <div className="w-full h-[50%] flex items-center">
              <DatePicker
                id="start_date"
                type="date"
                selected={course.start_time}
                onChange={handleStartDateChange}
                className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                dateFormat="dd/MM/yyyy"
                required
                autoComplete="off"
              />
            </div>
            <div className="w-full h-[25%] flex items-center"></div>
          </div>
          <div className="w-full h-full bg-[#373a6c] pl-[20px] rounded-[10px]">
            <div className="w-full h-[25%] flex items-center">
              <label htmlFor="start_time" className="text-white text-[18px]">
                Fecha de Finalizacion
              </label>
            </div>
            <div className="w-full h-[50%] flex items-center">
              <DatePicker
                id="end_date"
                type="date"
                selected={course.finish_time}
                onChange={handleEndDateChange}
                className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                dateFormat="dd/MM/yyyy"
                required
                autoComplete="off"
              />
            </div>
            <div className="w-full h-[25%] flex items-center"></div>
          </div>
        </div>
        <div className="bg-[#282a54] w-full h-full flex flex-col gap-[5px] rounded-[10px]">
          <div className="w-full h-[75%] bg-[#373a6c] pl-[20px] rounded-[10px]">
            <div className="w-full h-[10%] flex items-center">
              <label htmlFor="duration" className="text-white text-[18px]">
                Imagen
              </label>
            </div>
            <div className="w-full h-[20%] flex items-center">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-[90%] h-[75%] text-white flex flex-col"
              />
            </div>
            <div className="w-full h-[60%] flex items-center justify-center overflow-hidden ">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-[250px] max-w-full"
                />
              )}
            </div>
          </div>
          <div className="w-full h-[25%] bg-[#373a6c] pl-[20px] rounded-[10px]">
            <div className="w-full h-[25%] flex items-center justify-center">
              <label htmlFor="duration" className="text-white text-[20px]">
                Submit Product
              </label>
            </div>
            <div className="w-full h-[75%] flex items-center justify-center">
              <button
                type="submit"
                className="w-[250px] h-[50px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
