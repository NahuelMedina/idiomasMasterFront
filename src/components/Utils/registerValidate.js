const registerValidate = ({ name, lastName, email, age, image, password }) => {
  const errors = {};
  const regexImg = new RegExp(
    "[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$"
  );
  const regexNameAndLast = new RegExp("^(?!.* (?: |$))[A-Z][a-z ]+$");
  //NAME
  if (!name.length) errors.name = "El nombre es obligatorio.";
  else {
    if (!regexNameAndLast.test(name))
      errors.name = "Ingrese primer letra en mayuscula y sin espacios.";
    if (name.length > 20) errors.name = "Nombre demasiado largo.";
  }

  //LASTNAME
  if (!lastName.length) errors.lastName = "El apellido es obligatorio.";
  else {
    if (!regexNameAndLast.test(lastName))
      errors.lastName = "Ingrese primer letras en mayuscula y sin espacios.";
    if (lastName.length > 20) errors.lastName = "Apellido demasiado largo.";
  }

  //IMAGE
  if (!regexImg.test(image))
    errors.image = "permite solo archivos con extensión jpg o jpeg.";

  //EMAIL
  if (!email.length) errors.email = "El email es obligatorio.";

  //AGE
  if (!age.length) errors.age = "La edad es obligatoria.";
  else if (Number(age) < 18) errors.age = "La edad debe ser mayor a 18 años.";
  else if (Number(age) > 90) errors.age = "La edad debe ser menor a 90 años.";

  //PASSWORD
  if (!password.length) errors.password = "Debe contener contraseña.";
  else if (password.length < 8)
    errors.password = "La contraseña debe tener al menos 8 caracteres.";

  return errors;
};

export default registerValidate;
