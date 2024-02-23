const registerValidateEng = ({ name, lastname, email, age, img, password }) => {
    const errors = {};
    const regexImg = new RegExp("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$");
    const regexNameAndLast = new RegExp("^(?!.* (?: |$))[A-Z][a-z ]+$");
  
    //NAME
    if (!name.length) { errors.name = "The name is required." };
    if (!regexNameAndLast.test(name)) { errors.name = "Enter first letter in uppercase and no spaces." };
    if (name.length > 20) { errors.name = "Name longer than 20 characters." };
  
    //LASTNAME
    if (!lastname.length) { errors.lastname = "The last name is required." };
    if (!regexNameAndLast.test(lastname)) { errors.lastname = "Enter first letters in uppercase and no spaces." };
    if (lastname.length > 20) { errors.lastname = "Last name longer than 20 characters." };
  
    //IMAGE
    // if (!regexImg.test(img))
    //   errors.image = "only allows files with jpg or jpeg extension.";
  
    //EMAIL
    if (!email.length) { errors.email = "The email is required." };
  
    //AGE
    if (!age.length) { errors.age = "Age is required." };
    if (Number(age) < 18) { errors.age = "Age must be greater than 18." };
    if (Number(age) > 90) { errors.age = "Age must be less than 90." };
  
    //PASSWORD
    if (!password.length) errors.password = "Password is required.";
    if (password.length < 8) { errors.password = "Password must be at least 8 characters long." };
  
    return errors;
  }
  
  export default registerValidateEng;
  