import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const TopNavigation = () => {
  const navigate = useNavigate();

  const [isLogged, setIsLogged] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const viewPortWidth = window.innerWidth;
    if (viewPortWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut();
    navigate("/login");
  };

  return (
    <NavBar>
      {isMobile ? (
        <NavTitle onClick={() => setIsMenuOpen(!isMenuOpen)}>
          Time Tracker {isMenuOpen ? "▲" : " ▼"}
        </NavTitle>
      ) : (
        <NavTitle>Time Tracker</NavTitle>
      )}

      {isMenuOpen ? (
        <NavLinks>
          <NavLink>
            <Link to="/">Pomodoro</Link>
          </NavLink>
          <NavLink>
            <Link to="/todo">To-Do</Link>
          </NavLink>
          <NavLink>
            <Link to="/timetable">Timetable</Link>
          </NavLink>
          <NavLink>
            <Link to="/dashboard">Dashboard</Link>
          </NavLink>
          {!isLogged ? (
            <NavLink>
              <Link to="/login">Log In</Link>
            </NavLink>
          ) : (
            <NavLink onClick={handleLogout}>Log Out</NavLink>
          )}
        </NavLinks>
      ) : null}
    </NavBar>
  );
};

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #0077cc;
  color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    height: auto;
  }
`;

const NavTitle = styled.h1`
  margin: 0;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }
`;

const NavLink = styled.li`
  margin-left: 1rem;

  & > a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

export default TopNavigation;
