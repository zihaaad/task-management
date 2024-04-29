"use client";
import {useGlobalState} from "@/app/context/globalProvider";
import dateFormat from "@/app/utils/dateFormat";
import {edit, trash} from "@/app/utils/icons";
import React from "react";
import styled from "styled-components";

interface Props {
  _id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: string;
  isImportant: string;
}

export default function TaskItem({task}: {task: Props}) {
  const {theme} = useGlobalState();
  return (
    <TaskItemStyles theme={theme} className="task" key={task._id}>
      <h2 className="font-semibold text-xl"> {task.title}</h2>
      <p>{task.description}</p>
      <p className="date">{dateFormat(task.date)}</p>
      <div className="task-footer">
        {task.isCompleted ? (
          <button className="completed">Completed</button>
        ) : (
          <button className="incomplete">Incomplete</button>
        )}
        <button className="edit">{edit}</button>
        <button className="trash">{trash}</button>
      </div>
    </TaskItemStyles>
  );
}

const TaskItemStyles = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;

    i {
      font-size: 1.4rem;
      color: ${(props) => props.theme.colorGrey2};
    }
  }

  .edit {
    margin-left: auto;
  }

  .completed,
  .incomplete {
    display: inline-block;
    padding: 0.4rem 1rem;
    background: ${(props) => props.theme.colorDanger};
    border-radius: 30px;

    .completed {
      background: ${(props) => props.theme.colorGreenDark};
    }
  }
`;
