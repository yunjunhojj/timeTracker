import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TopNavigation = () => {
  const NavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #0077cc;
    color: #fff;
  `;

  const NavTitle = styled.h1`
    margin: 0;
  `;

  const NavLinks = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
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
  `;

  return (
    <NavBar>
      <NavTitle>Time Tracker</NavTitle>
      <NavLinks>
        <NavLink>
          <Link to="/">Pomodoro Timer</Link>
        </NavLink>
        <NavLink>
          <Link to="/todo">To-Do List</Link>
        </NavLink>
        <NavLink>
          <Link to="/timetable">Timetable</Link>
        </NavLink>
        <NavLink>
          <Link to="/dashboard">Dashboard</Link>
        </NavLink>
        <NavLink>
          <Link to="/login">Log In</Link>
        </NavLink>
        <NavLink>
          <Link to="/signup">Sign Up</Link>
        </NavLink>
      </NavLinks>
    </NavBar>
  );
};

export default TopNavigation;
