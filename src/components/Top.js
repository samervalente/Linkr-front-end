import styled from "styled-components";
import { AiOutlineDown, AiOutlineUp, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import SearchBar from "./SearchBar";


export default function Top({ fetchDependency, setDependency }) {
  const {
    setToken,
    imageProfile,
    setImageProfile,
    menuDisplay,
    setMenuDisplay,
  } = useContext(UserContext);
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
    localStorage.removeItem("userId")
    setImageProfile("");
    navigate("/");
  }


  return (
    <Conteiner>
      <Header onClick={checkMenu}>
        <Link to="/timeline">
          <h1>linkr</h1>
        </Link>

        {/*Search Bar */}
        <SearchBarBox>
        <SearchBar fetchDependency={fetchDependency} setDependency={setDependency} />
        </SearchBarBox>
      
        <ImageSide onClick={menu}>
          {menuDisplay ? (
            <AiOutlineUp color="white" size="26px" />
          ) : (
            <AiOutlineDown color="white" size="26px" />
          )}
          <img src={imageProfile} alt="user" />
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

  a {
    text-decoration: none;
  }
  h1 {
    font-family: "Passion One", cursive;
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    color: #ffffff;
    margin-top: 10px;
  }
  img {
    width: 53px;
    height: 53px;
    object-fit: cover;
    border-radius: 26.5px;
  }

  @media (max-width: 611px) {
    h1 {
      font-size: 45px;
    }
    img {
      width: 44px;
      height: 44px;
    }
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
  justify-content: space-between;
  padding: 0 25px;
  height: 100%;
  color: white;
`;

const SearchBarBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  @media (max-width: 611px) {
    display: none;
  }
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
