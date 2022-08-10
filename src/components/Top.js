import styled from "styled-components";
import { AiOutlineDown } from "react-icons/ai";

export default function Top() {
  return (
    <Conteiner>
      <h1>linkr</h1>
      <ImageSide>
        <AiOutlineDown color="white" size="26px" />
        <img
          src="https://classic.exame.com/wp-content/uploads/2020/06/Bob-Esponja.png?w=550"
          alt="user"
        />
      </ImageSide>
    </Conteiner>
  );
}

const Conteiner = styled.div`
  height: 72px;
  width: 100%;
  background-color: #151515;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
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
`;
