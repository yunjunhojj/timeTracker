import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  toggleTodo,
  removeTodo,
} from "../features/todoSlice/todoSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px; ;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #0077ff;
  }
`;

const Button = styled.button`
  background-color: #0077ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0062cc;
  }

  &:focus {
    outline: none;
  }
`;

const List = styled.ul`
  width: 300px;

  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => (props.completed ? "#d9d9d9" : "#fff")};
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

const TaskName = styled.span`
  flex-grow: 1;
  font-size: 16px;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

const DeleteButton = styled.button`
  background-color: #fff;
  color: #0077ff;
  border: 1px solid #0077ff;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0077ff;
    color: #fff;
  }

  &:focus {
    outline: none;
  }
`;

const TodoListPage = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const dispatch = useDispatch();

  const handleAddTask = (event) => {
    event.preventDefault();
    const taskName = event.target.elements.taskName.value.trim();
    if (taskName) {
      const newTask = {
        id: uuid(),
        name: taskName,
        completed: false,
      };
      dispatch(addTodo(newTask));

      event.target.reset();
    }
  };

  const handleToggleTask = (taskId) => {
    dispatch(toggleTodo(taskId));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(removeTodo(taskId));
  };

  return (
    <Wrapper>
      <h1>Todo List</h1>
      <Form onSubmit={handleAddTask}>
        <Input type="text" name="taskName" placeholder="Enter task name" />
        <Button type="submit">Add</Button>
      </Form>
      {todoList.length > 0 ? (
        <List>
          {todoList.map((todo) => (
            <ListItem key={todo.id} completed={todo.completed}>
              <Checkbox
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTask(todo.id)}
              />
              <TaskName completed={todo.completed}>{todo.name}</TaskName>
              <DeleteButton onClick={() => handleDeleteTask(todo.id)}>
                Delete
              </DeleteButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No tasks added yet.</p>
      )}
    </Wrapper>
  );
};

export default TodoListPage;
