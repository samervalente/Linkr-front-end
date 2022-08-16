import styled from "styled-components";
import { TiPencil } from "react-icons/ti";
import { CgTrash } from "react-icons/cg";
import { AiOutlineComment } from "react-icons/ai";
import { useState, useContext, useRef, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import { updatePost } from "../services/post";
import Modal from "react-modal";
import Likes from "../components/Likes";
import Comments from "./Comments";
import axios from "axios";

Modal.setAppElement("#root");

export default function FetchPosts({
  post,
  userId,
  setDependency,
  fetchDependency,
}) {
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState(0);
  const [openComment, setOpenComment] = useState(false);

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

  function openModal() {
    setIsModalOpen(true);
    console.log("fui clicado");
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function deletePost() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.delete(
      `https://linkr-driven.herokuapp.com/posts/${post.id}`,
      config
    );
    promise.then((response) => {
      setIsModalOpen(false);
      setDependency(!fetchDependency);
    });

    promise.catch((error) => {
      console.log(error);
      setIsModalOpen(false);
      alert("It was not possible to delete the post");
    });
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
    <Conteiner>
    <PostBox>
      <LeftSide>
        <ClickSyle onClick={redirectUser}>
          <img src={post.imageProfile} />
        </ClickSyle>
        <Likes post={post} />
        <CommentIcon onClick={() => setOpenComment(!openComment)}/>
        <span>{comments} comments</span>
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
              <ReactTagify
                tagStyle={tagStyle}
                tagClicked={(tag) => choiceHashtag(tag)}
              >
                {post.description}
              </ReactTagify>
            </p>
          )}
          {isModalOpen ? (
            <Dialog isOpen={isModalOpen} /*style={customStyle}*/>
              <h2>Are you sure you want to delete this post?</h2>
              <div>
                <No onClick={closeModal}>No, go back</No>
                <Yes onClick={deletePost}>Yes, delete it</Yes>
              </div>
            </Dialog>
          ) : (
            <></>
          )}
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
    {openComment ? <Comments id={post.id} /> : null }
    </Conteiner>
  );
}

const Conteiner = styled.div`
  display: flex;
  flex-direction: column;
  width: 611px;
  background-color: #1E1E1E;
  margin-top: 16px;
  border-radius: 16px;

  @media (max-width: 611px) {
    width: 100%;
    border-radius: 0;
  }
`

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

  h2 {
    width: 338px;
    color: #ffffff;
    font-weight: 700;
    font-size: 25px;
    text-align: center;
    line-height: 31px;
  }

  div {
    width: 300px;
    display: flex;
    justify-content: space-between;
  }
`;

const No = styled.button`
  width: 134px;
  height: 37px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 5px;
  border: none;
  background-color: #ffffff;
  color: #1877f2;
  cursor: pointer;
`;

const Yes = styled.button`
  width: 134px;
  height: 37px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 5px;
  border: none;
  background-color: #1877f2;
  color: #ffffff;
  cursor: pointer;
`;

const PostBox = styled.div`
  width: 611px;
  min-height: 276px;
  background-color: #171717;
  border-radius: 16px;
  display: flex;
  padding: 18px 18px 18px 11px;

  @media (max-width: 611px) {
    width: 100%;
    border-radius: 0;
  }
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
    word-break: break-word;
  }

  @media (max-width: 611px) {
    h1 {
      font-size: 17px;
    }

    p {
      font-size: 15px;
    }
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-width: 85px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    object-fit: cover;
    margin-bottom: 18px;
    @media (max-width: 611px) {
      width: 40px;
      height: 40px;
    }
  }
  span {
    color: #ffffff;
    font-family: 'Lato';
    font-size: 12px;
    font-weight: 400;
    margin-top: 6px;
    text-align: center;
    white-space: nowrap;
  }
`;

const RightTop = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 100%;
`;

const Texts = styled.div`
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
    word-break: break-word;
  }

  h4 {
    color: #cecece;
    font-size: 11px;
    word-break: break-word;
  }

  @media (max-width: 611px) {
    h1 {
      font-size: 11px;
    }

    h2,
    h4 {
      font-size: 9px;
    }
  }
`;

const Image = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  img {
    width: 155px;
    height: 157px;
    border-radius: 0px 11px 11px 0px;
    object-fit: cover;
  }
  @media (max-width: 611px) {
    img {
      width: 95px;
    }
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

const CommentIcon = styled(AiOutlineComment)`
    margin-top: 15px;
    width: 20px;
    height: 20px;
    color: #ffffff;
    cursor: pointer;
`;

const ClickSyle = styled.div`
  cursor: pointer;
`;
