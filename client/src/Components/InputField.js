import { memo } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
const SignupInput = ({placeholder,name,value,onChange,onBlur,type}) => {
  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </InputGroup>
    </>
  );
};
export default memo(SignupInput);
