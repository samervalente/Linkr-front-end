import styled from "styled-components";
import { TiPencil } from "react-icons/ti";
import { CgTrash } from "react-icons/cg";
import { AiFillHeart } from "react-icons/ai";
import { useState, useContext, useRef, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import { updatePost } from "../services/post";
import Modal from "react-modal";
import Likes from '../components/Likes';
import axios from 'axios';

Modal.setAppElement("#root");

export default function FetchPosts({ post, userId, setDependency, fetchDependency }) {
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function redirectUser() {
    navigate(`/user/${post.userId}`);
  }
  const inputRef = useRef(null);
  const toggleEditing = () => {
    setEditing(!isEditing);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      editPost();
    } else if (e.key === "Escape") {
      setEditing(false);
      setText("");
    }
  };

  async function editPost() {
    const body = text ? { text } : null;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await updatePost(post.id, body, config);

    if (response === 200) {
      setDependency(!fetchDependency);
      setLoading(false);
      setEditing(false);
      setText("");
    } else {
      setLoading(false);
      alert("Não foi possível salvar as alterações");
    }
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function choiceHashtag(name) {
    name = name.replace("#", "").toLowerCase();

    navigate(`/hashtag/${name}`);
    setDependency(!fetchDependency);
  }
  const tagStyle = {
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  };

  //MODAL

  function openModal(){
    setIsModalOpen(true);
    console.log("fui clicado")
  }

  function closeModal(){
    setIsModalOpen(false);
  }

  function deletePost(){
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    
    const promise = axios.delete(`http://localhost:4000/posts/${post.id}`, config);
    promise.then((response) => {
      setIsModalOpen(false);
      setDependency(!fetchDependency);
      
    })

    promise.catch((error) => {
      console.log(error);
      setIsModalOpen(false);
      alert('It was not possible to delete the post');
    })
  }

  /*const customStyle = { 
    content:{
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "597px",
      height: "262px",
      backgroundColor: "#333333",
      borderRadius: "50px",
      color: "white",
      textAlign: "center",
      fontFamily: "Lato",
      fontSize: "25px",
      padding: "60px",
      fontWeight: "700",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  }*/

  return (
    <PostBox>
      <LeftSide>
        <ClickSyle onClick={redirectUser}>
          <img src={post.imageProfile} />
        </ClickSyle>
        <Likes post={post} />
      </LeftSide>
      <RightTop>
        <TopBox>
          <h1>
            <ClickSyle onClick={redirectUser}>{post.name} </ClickSyle>
            {userId === post.userId ? (
              <span>
                <Pencil onClick={toggleEditing} /> <Trash onClick={openModal} />
              </span>
            ) : null}{" "}
          </h1>
          {isEditing ? (
            <TextArea
              ref={inputRef}
              disabled={loading}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          ) : (
              <p>
                <ReactTagify tagStyle={tagStyle} tagClicked={(tag) => choiceHashtag(tag)}>
                  {post.description}
                </ReactTagify>
              </p>
          )}
          {isModalOpen ? 
            <Dialog isOpen={isModalOpen} /*style={customStyle}*/>
              <h2>Are you sure you want to delete this post?</h2>
              <div>
                <No onClick={closeModal}>No, go back</No>
                <Yes onClick={deletePost}>Yes, delete it</Yes>
              </div>
            </Dialog> 
            : 
            <></>}
        </TopBox>
        <LinkPart>
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
        </LinkPart>
      </RightTop>
    </PostBox>
  );
}

const Dialog = styled(Modal)`
  margin: 50vh;
  margin-left: 50%;
  transform: translate(-50%, -50%);
  width: 597px;
  height: 262px;
  background-color: #333333;
  border-radius: 50px;
  font-family: Lato;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  h2{
    width: 338px;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 25px;
    text-align: center;
    line-height: 31px;
  }

  div{
    width: 300px;
    display: flex;
    justify-content: space-between;
  }

`

const No = styled.button`
    width: 134px;
    height: 37px;
    font-size: 16px;
    font-weight: 700;
    border-radius: 5px;
    border: none;
    background-color: #FFFFFF;
    color: #1877F2;
`

const Yes = styled.button`
    width: 134px;
    height: 37px;
    font-size: 16px;
    font-weight: 700;
    border-radius: 5px;
    border: none;
    background-color: #1877F2;
    color: #FFFFFF;

`

const PostBox = styled.div`
  width: 611px;
  min-height: 276px;
  background-color: #171717;
  border-radius: 16px;
  margin-bottom: 16px;
  display: flex;
  padding: 18px;
`;

const LinkPart = styled.div`
  a {
    height: 159px;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    position: relative;
  }
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    width: 495px;
    font-family: "Lato";
    color: #ffffff;
    font-size: 19px;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
  }

  p {
    font-family: "Lato";
    color: #b7b7b7;
    margin: 8px 0;
    min-height: 44px;
  }
`;

const LeftSide = styled.div`
  width: 90px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    object-fit: cover;
    margin-bottom: 18px;
  }
  span {
    color: #ffffff;
    font-size: 12px;
    font-weight: 400;
    margin-top: 6px;
  }
`;

const RightTop = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
`;

const Texts = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 20px;
  font-family: "Lato";

  h1 {
    color: #cecece;
    font-size: 16px;
  }

  h2 {
    color: #9b9595;
    font-size: 11px;
    text-align: justify;
  }

  h4 {
    color: #cecece;
    font-size: 11px;
  }
`;

const Image = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 155px;
    height: 157px;
    border-radius: 0px 11px 11px 0px;
    object-fit: cover;
  }
`;

const TextArea = styled.textarea`
  height: 44px;
  width: 100%;
  margin: 8px 0;
  background-color: #efefef;
  text-indent: 10px;
  color: #4c4c4c;
  border: none;
  outline: none;
  border-radius: 7px;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  resize: none;
`;

//style icons:

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

const ClickSyle = styled.div`
  cursor: pointer;
`;
