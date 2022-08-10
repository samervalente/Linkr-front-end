import styled from "styled-components";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Top() {
  const { setToken, imageProfile, setImageProfile, menuDisplay, setMenuDisplay } = useContext(UserContext);
  const navigate = useNavigate();
  function checkMenu() {
    if (menuDisplay) {
      setMenuDisplay(false);
    }
  }
  function menu() {
    if (menuDisplay) {
      setMenuDisplay(false);
    } else {
      setMenuDisplay(true);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    localStorage.removeItem("image");
    setImageProfile("");
    navigate("/");
  }

  return (
    <Conteiner>
      <Header onClick={checkMenu}>
        <h1>linkr</h1>
        <ImageSide onClick={menu}>
          {menuDisplay ? (
            <AiOutlineUp color="white" size="26px" />
          ) : (
            <AiOutlineDown color="white" size="26px" />
          )}
          <img
            src={imageProfile}
            alt="user"
          />
        </ImageSide>
      </Header>
      {menuDisplay ? (
        <Logout>
          <div onClick={logout}>
            <span>Logout</span>
          </div>
        </Logout>
      ) : (
        <></>
      )}
    </Conteiner>
  );
}

const Conteiner = styled.div`
  height: 72px;
  width: 100%;
  background-color: #151515;
  position: fixed;
  top: 0;
  z-index: 1;
  h1 {
    font-family: "Passion One", cursive;
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    color: #ffffff;
  }
  img {
    width: 53px;
    height: 53px;
    object-fit: cover;
    border-radius: 26.5px;
  }
`;

const ImageSide = styled.div`
  display: flex;
  width: 86px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  height: 100%;
`;

const Logout = styled.div`
  height: 40px;
  width: 120px;
  position: fixed;
  right: 0;
  border-radius: 0px 0px 0px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #171717;
  span {
    color: #ffffff;
    size: 17px;
    cursor: pointer;
  }
`;
