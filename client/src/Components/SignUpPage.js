import { memo } from "react";
import NavbarUpper from "./Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React, { useState } from "react";
import { useFormik } from "formik";
import { signUpSChema } from "../Schema";
import InputGroup from "react-bootstrap/InputGroup";
const SignupInput = React.lazy(() => import("./InputField"));
// import { useState } from "react";
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dob: "",
  country: "",
  password: "",
  confirmPassword: "",
};

const SignUpPage = () => {
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSChema,
      onSubmit: (value, action) => (console.log(value), action.resetForm()),
    });
  return (
    <>
      <NavbarUpper />
      <div className="container col-md-9">
        <Card className="text-center">
          <Card.Header>
            <h2>Sign Up Form</h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <SignupInput
                    placeholder="First Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                  />
                  {errors.firstName && touched.firstName ? (
                    <p style={{ color: "red" }}>{errors.firstName}</p>
                  ) : null}
                </Col>
                <Col>
                  <SignupInput
                    placeholder="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                  />
                  {errors.lastName && touched.lastName ? (
                    <p style={{ color: "red" }}>{errors.lastName}</p>
                  ) : null}
                </Col>
              </Row>

              <Row>
                <Col>
                  <SignupInput
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                  />
                  {errors.email && touched.email ? (
                    <p style={{ color: "red" }}>{errors.email}</p>
                  ) : null}
                </Col>
                <Col>
                  <SignupInput
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                  />
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <p style={{ color: "red" }}>{errors.phoneNumber}</p>
                  ) : null}
                </Col>
              </Row>

              <Row>
                <Col>
                  <SignupInput
                    placeholder="DOB"
                    name="dob"
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="date"
                  />
                  {errors.dob && touched.dob ? (
                    <p style={{ color: "red" }}>{errors.dob}</p>
                  ) : null}
                </Col>
                <Col>
                  <SignupInput
                    placeholder="Country"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                  />
                  {errors.country && touched.country ? (
                    <p style={{ color: "red" }}>{errors.country}</p>
                  ) : null}
                </Col>
              </Row>

              <Row>
                <Col>
                  <SignupInput
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                  />
                  {errors.password && touched.password ? (
                    <p style={{ color: "red" }}>{errors.password}</p>
                  ) : null}
                </Col>
                <Col>
                  <SignupInput
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p style={{ color: "red" }}>{errors.confirmPassword}</p>
                  ) : null}
                </Col>
              </Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
export default memo(SignUpPage);

// const SignUpPage = () => {
//   const [initialFormValues, setINitialFormValues] = useState({
//     fname: "",
//     lname: "",
//     email: "",
//     number: "",
//     date : "",
//     country : "",
//     password : "",
//     onfirmPassword: "",
//   });
//   const handleInput = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setINitialFormValues({ ...initialFormValues, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(initialFormValues);
//     setINitialFormValues({
//       fname: "",
//       lname: "",
//       email: "",
//       number: "",
//       date : "",
//       country : "",
//       password : "",
//       confirmPassword: "",
//     })
//   };
//   return (
//     <>
//     <NavbarUpper />
//       <div className="container col-md-5">
//         <Card className="text-center mt-3">
//           <Card.Header>
//             <h2>LogIn Form</h2>
//           </Card.Header>
//           <Card.Body>
//             <Form onSubmit={handleSubmit}>
//               <Row>
//                 <Col>
//                   <InputGroup className="mb-3">
//                     <Form.Control
//                       placeholder="First Name"
//                       name="fname"
//                       type="text"
//                       value={initialFormValues.fname}
//                       onChange={handleInput}
//                       required
//                       // onBlur={onBlur}
//                     />
//                   </InputGroup>
//                 </Col>
//                 <Col>
//                   <InputGroup className="mb-3">
//                     <Form.Control
//                       placeholder="Last Name"
//                       name="lname"
//                       type="text"
//                       value={initialFormValues.lname}
//                       onChange={handleInput}
//                       required
//                       // onBlur={onBlur}
//                     />
//                   </InputGroup>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col>
//                   <InputGroup className="mb-3">
//                     <Form.Control
//                       placeholder="Email Name"
//                       name="email"
//                       type="email"
//                       value={initialFormValues.email}
//                       onChange={handleInput}
//                       required
//                       // onBlur={onBlur}
//                     />
//                   </InputGroup>
//                 </Col>
//                 <Col>
//                   <InputGroup className="mb-3">
//                     <Form.Control
//                       placeholder="Number"
//                       name="number"
//                       type="number"
//                       value={initialFormValues.number}
//                       onChange={handleInput}
//                       required
//                       // onBlur={onBlur}
//                     />
//                   </InputGroup>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col>
//                   <InputGroup className="mb-3">
//                     <Form.Control
//                       // placeholder=""
//                       name="date"
//                       type="date"
//                       value={initialFormValues.date}
//                       onChange={handleInput}
//                       required
//                       // onBlur={onBlur}
//                     />
//                   </InputGroup>
//                 </Col>
//                 <Col>
//                   <InputGroup className="mb-3">
//                     <Form.Control
//                       placeholder="country"
//                       name="country"
//                       type="text"
//                       value={initialFormValues.country}
//                       onChange={handleInput}
//                       required
//                       // onBlur={onBlur}
//                     />
//                   </InputGroup>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col>
//                   <InputGroup className="mb-3">
//                     <Form.Control
//                       placeholder="Password"
//                       name="password"
//                       type="password"
//                       value={initialFormValues.password}
//                       onChange={handleInput}
//                       required
//                       // onBlur={onBlur}
//                     />
//                   </InputGroup>
//                 </Col>
//                 <Col>
//                   <InputGroup className="mb-3">
//                     <Form.Control
//                       placeholder="Confirm Password"
//                       name="confirmPassword"
//                       type="password"
//                       value={initialFormValues.confirmPassword}
//                       onChange={handleInput}
//                       required
//                       // onBlur={onBlur}
//                     />
//                   </InputGroup>
//                 </Col>
//               </Row>

//               <Button variant="primary" type="submit">
//                 submit
//               </Button>
//             </Form>
//           </Card.Body>
//         </Card>
//       </div>
//     </>
//   );
// };
// export default SignUpPage;
