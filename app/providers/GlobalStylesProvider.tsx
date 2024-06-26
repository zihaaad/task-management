"use client";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

export default function GlobalStylesProvider({children}: Props) {
  return <GlobalStyles>{children}</GlobalStyles>;
}

const GlobalStyles = styled.div`
  padding: 2.5rem;
  display: flex;
  gap: 2.5rem;
  height: 100vh;
  transition: all 0.3s ease-in-out;

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  @media screen and (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;
