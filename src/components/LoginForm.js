import styled from "styled-components";
import Button from "../shared/Button";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendLoginData } from "../services/auth";
import UserContext from "../context/UserContext";

export default function RegisterForm() {
  const { setToken, token } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginProcess, setLoginProcess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoginProcess(true);

    const userData = {
      email,
      password,
    };
    const response = await sendLoginData(userData);
    
    if (response) {
      setToken(response);
      navigate("/timeline");
    } else {
      setEmail("");
      setPassword("");
      alert(
        "As informações de e-mail e/ou senha estão incorretas. Insira os dados novamente ou faça o cadastro!"
      );
      setLoginProcess(false);
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="email"
          placeholder={"e-mail"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          required
          type="password"
          placeholder={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {loginProcess ? (
          <Button label={"Log In"} variant={"disable"} />
        ) : (
          <Button label={"Log In"} type={"submit"} />
        )}
        <br />
        <Link to="/signup">
          <span>First time? Create an account!</span>
        </Link>
      </form>
    </Container>
  );
}

const Container = styled.div`
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    background-color: white;
    height: 65px;
    width: 80%;
    border-radius: 6px;
    margin: 5px 0px;
    font-size: 27px;
    font-family: "Oswald";
    padding: 12px;

    :focus {
      outline: 4px var(--blue) solid;
    }

    ::placeholder {
      color: var(--ligthgray);
      font-family: "Oswald", sans-serif;
      font-size: 27px;
    }
  }

  a {
    margin-top: 10px;
    font-size: 20px;
    font-family: "Lato", sans-serif;
    cursor: pointer;
    text-decoration: none;
    color: white;
  }
`;
