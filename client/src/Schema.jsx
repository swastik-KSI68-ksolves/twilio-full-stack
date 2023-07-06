import * as Yup from 'yup';
export const signUpSChema = Yup.object({
    firstName: Yup.string().min(2).max(30).required("Please enter first name"),
    lastName :Yup.string().min(2).max(30).required("Please enter last name"),
    email: Yup.string().email().required("Please enter email"),
    phoneNumber : Yup.number().required("Please enter your phone number"),
    dob : Yup.string().required("Please enter date of birth"),
    country : Yup.string().required("Please enter your country"),
    password : Yup.string().required("Please enter password") ,
    confirmPassword : Yup.string().required("Please enter confirm password").oneOf([Yup.ref('password'),null],"Password must match")

});