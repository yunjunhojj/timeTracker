import React, { useState } from "react";
import styled from "styled-components";

const SignUpPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const SignUpInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: #f2f2f2;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
`;

const SignUpButton = styled.button`
  background-color: #0077c0;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // implement sign up functionality here
  };

  return (
    <SignUpPageWrapper>
      <SignUpForm onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <SignUpInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <SignUpInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <SignUpInput
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        <SignUpButton type="submit">Sign Up</SignUpButton>
      </SignUpForm>
    </SignUpPageWrapper>
  );
}

export default SignUpPage;
