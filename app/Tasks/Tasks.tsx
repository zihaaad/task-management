"use client";
import React from "react";
import styled from "styled-components";
import {useGlobalState} from "../context/globalProvider";

export default function Tasks() {
  const {theme} = useGlobalState();

  return (
    <TaskStyles theme={theme}>
      <h1>Tasks</h1>
    </TaskStyles>
  );
}

const TaskStyles = styled.div`
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
`;
