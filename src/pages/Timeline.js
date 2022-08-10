import styled from "styled-components";
import CreatePost from "../components/CreatePost";
import Top from "../components/Top";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Timeline() {
  const navigate = useNavigate();
  const { token, imageProfile, menuDisplay, setMenuDisplay  } = useContext(UserContext);

   useEffect(() => {
    if (!token || !imageProfile) {
      navigate('/');
    } 
   }, []);

  function checkMenu() {
    if (menuDisplay) {
      setMenuDisplay(false);
    }
  }
  return (
    <Conteiner onClick={checkMenu}>
      <Top />
      <Content>
        <Title>timeline</Title>
        <Sides>
          <RightSide>
            {<CreatePost token ={ token } imageProfile={ imageProfile } />}
            <div>aqui vão os posts da timeline</div>
          </RightSide>
          <LeftSide></LeftSide>
        </Sides>
      </Content>
    </Conteiner>
  );
}

const Conteiner = styled.div`
  display: flex;
  justify-content: center;
  background-color: #333333;
  min-height: 100vh;
  padding-top: 150px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
  margin-bottom: 40px;
`;

const Sides = styled.div`
  display: flex;
`;

const RightSide = styled.div`
  width: 611px;
  display: flex;
  flex-direction: column;
`;

const LeftSide = styled.div`
  width: 301px;
  height: 406px;
  background-color: #171717;
  border-radius: 16px;
  margin-left: 25px;
`;
