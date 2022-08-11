import styled from "styled-components";
import { TiPencil } from "react-icons/ti";
import { CgTrash } from "react-icons/cg";
import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

export default function FetchPosts({ post, userId }) {

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const { token } = useContext(UserContext);

  return (
    <PostBox>
      <LeftTop>
        <LeftSide>
          <img src={post.imageProfile} />
          {isLiked ? <FillHeart /> : <Heart />}
          <span>{likes} likes</span>
        </LeftSide>
        <TopBox>
          <div>
            <h1>
              {post.name}{" "}
              {userId === post.userId ? <span><Pencil /> <Trash /></span> : null}
              {" "}
            </h1>
            <p>{post.description}</p>
          </div>
        </TopBox>
      </LeftTop>

      <a href={post.url} target="_blank">
        <Texts>
          <h1>{post.urlTitle}</h1>
          <h2>{post.urlDescription}</h2>
          <h4>{post.url}</h4>
        </Texts>

        <Image>
          <img src={post.urlImage}></img>
        </Image>        
      
      </a>
    </PostBox>
  );
}

const PostBox = styled.div`
  width: 611px;
  height: 276px;
  background-color: #171717;
  border-radius: 16px;
  margin-bottom: 16px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    object-fit: cover;
    margin: 18px;
  }

  a{
    width: 503px;
    height: 155px;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
    margin-left: 86px;
    margin-top: -28px;
    display: flex;
    justify-content: space-between;
    text-decoration: none;
  }
`;

const TopBox = styled.div`
  display: flex;

  h1 {
    width: 495px;
    font-family: "Lato";
    color: #ffffff;
    font-size: 19px;
    margin-top: 19px;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
  }

  p {
    font-family: "Lato";
    color: #b7b7b7;
    margin-top: 8px;
  }
`;

const LeftSide = styled.div`
  width: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    color: #ffffff;
    font-size: 12px;
    font-weight: 400;
    margin-top: 6px;
  }
`;

const LeftTop = styled.div`
  display: flex;
`;

const Texts = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 20px;
  font-family: 'Lato';  

  h1{
    color: #cecece;
    font-size: 16px;
  }

  h2{
    color:#9B9595;
    font-size: 11px;
    text-align: justify;
  }

  h4{
    color: #cecece;
    font-size: 11px;
  }
`


const Image =styled.div`
  img{
    border-radius: 0px 12px 13px 0px;
  }

`

//style icons:

const Heart = styled(FiHeart)`
  width: 20px;
  height: 20px;
  color: #ffffff;
`;

const Pencil = styled(TiPencil)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const Trash = styled(CgTrash)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const FillHeart = styled(AiFillHeart)`
  width: 20px;
  height: 20px;
  color: red;
`;
