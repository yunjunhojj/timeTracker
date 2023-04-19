import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border: none;
  background-color: #0077cc;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #005fa3;
  }
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  const gotohome = () => {
    navigate("/");
  };

  return (
    <Wrapper>
      <Title>404</Title>
      <Description>
        Sorry, the page you requested could not be found.
      </Description>
      <Button onClick={gotohome}>Go back to home</Button>
    </Wrapper>
  );
};

export default NotFoundPage;
