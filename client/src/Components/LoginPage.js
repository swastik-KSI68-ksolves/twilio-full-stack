import { memo } from "react";
import NavbarUpper from "./Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React from "react";
import { useFormik } from "formik";
import { signUpSChema } from "../Schema";
const SignupInput = React.lazy(() => import("./InputField"));
const initialValues = {
  email: "",
  phoneNumber: "",
  password: "",
};
const LogInPage = () => {
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSChema,
      onSubmit: (value, action) => (console.log(value), action.resetForm()),
    });
  return (
    <>
      <NavbarUpper />
      <div className="container col-md-5">
        <Card className="text-center mt-3">
          <Card.Header>
            <h2>LogIn Form</h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
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
export default memo(LogInPage);
