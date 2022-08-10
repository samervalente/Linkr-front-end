import styled from "styled-components";
import { TiPencil } from "react-icons/ti";
import { CgTrash } from "react-icons/cg";
import { FiHeart } from "react-icons/fi";

export default function fetchPosts({ post }) {
  return (
    <PostBox>
      <LeftTop>
        <LeftSide>
          <img src={post.imageProfile} />
          <Heart />
        </LeftSide>
        <TopBox>
          <div>
            <h1>
              {post.name}{" "}
              <span>
                <Pencil /> <Trash />
              </span>{" "}
            </h1>
            <p>{post.description}</p>
          </div>
        </TopBox>
      </LeftTop>

      <LinkBox></LinkBox>
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
`;

const LeftTop = styled.div`
  display: flex;
`;

const LinkBox = styled.div`
  width: 503px;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  margin-left: 86px;
  margin-top: -10px;
`;
//style icons:

const Heart = styled(FiHeart)`
  width: 20px;
  height: 20px;
  color: #ffffff;
`;

const Pencil = styled(TiPencil)`
  width: 20px;
  height: 20px;
`;

const Trash = styled(CgTrash)`
  width: 20px;
  height: 20px;
`;
