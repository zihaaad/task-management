"use client";
import React from "react";
import styled from "styled-components";
import {useGlobalState} from "../context/globalProvider";
import TaskItem from "../Components/TaskItem/TaskItem";
import {plus} from "../utils/icons";
import CreateContent from "../Components/Modals/CreateContent";

interface Props {
  title: string;
  tasks: any[];
}

export default function Tasks({title, tasks}: Props) {
  const {theme, isLoading} = useGlobalState();

  return (
    <TaskStyled theme={theme}>
      <h1>{title}</h1>
      {!isLoading ? (
        <div className="tasks grid">
          {tasks?.map((task) => (
            <TaskItem key={task.id} task={{...task}} />
          ))}
          <button className="create-task">
            {plus}
            Add New Task
          </button>
        </div>
      ) : (
        <div className="tasks-loader w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      )}
    </TaskStyled>
  );
}

const TaskStyled = styled.div`
  height: 100%;
  width: 100%;
  padding: 2rem;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .tasks {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;
