import styled from "styled-components";
import UserContext from "../context/UserContext";
import Top from "../components/Top";
import { useContext, useEffect, useState } from "react";

export default function User() {
  const { token, imageProfile, menuDisplay, setMenuDisplay } =
    useContext(UserContext);

  function checkMenu() {
    if (menuDisplay) {
      setMenuDisplay(false);
    }
  }
  return (
    <Container onClick={checkMenu}>
      <Top />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #333333;
  min-height: 100vh;
  padding-top: 150px;
`;
