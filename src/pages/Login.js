import styled from "styled-components";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import UserContext from "../context/UserContext";
import { checkToken } from "../utils/tokenValidation";

export default function Login() {
  const navigate = useNavigate();
  const { setToken, setImageProfile, page } = useContext(UserContext);
  checkToken(navigate, setToken, setImageProfile, page);
  
  return (
    <>
      <Container>
        <div className="leftSide">
          <h1 className="title">linkr</h1>
          <p>save, share and discover the best links on the web</p>
        </div>
        <div className="rightSide">
          <LoginForm />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  color: white;

  div {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;

    .title {
      font-size: 106px;
    }

    p {
      font-family: "Oswald", sans-serif;
      font-size: 42px;
      font-weight: 700;
      width: 60%;
      line-height: 60px;
    }
  }

  .leftSide {
    padding-left: 100px;
    background-color: var(--black);
    width: 62%;
  }

  .rightSide {
    background-color: var(--gray);
    width: 38%;
  }

  @media(max-width: 768px) {
    flex-direction: column;

    .leftSide{
        width: 100%;
        height: 175px;
        padding-left:0;
        align-items: center;

        .title {
          font-size: 76px;
      }   

        p{
            font-size:23px;
            line-height: 30px;
            width: 70%;
            text-align: justify;
        }
    }

    .rightSide{
      justify-content: flex-start;
      width: 100%;
      height: calc(100vh - 175px);
    }
  }
`;
