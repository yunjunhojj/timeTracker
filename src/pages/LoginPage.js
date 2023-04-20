import React, { useState } from "react";
import styled from "styled-components";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page refresh
    // TODO: implement login functionality
    handleLogin();
  };

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <LoginPageContainer>
      <Title>Time-Tracker</Title>
      <Subtitle>Login</Subtitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email:</Label>
          <Input type="email" value={email} onChange={handleEmailChange} />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>
      <p>
        아이디가 없으신가요? <a href="/signup">Sign up</a>
      </p>
    </LoginPageContainer>
  );
}

const LoginPageContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f8f8f8;
`;

const Title = styled.h1`
  font-size: 36px;
  text-align: center;
  margin-bottom: 30px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default LoginPage;
