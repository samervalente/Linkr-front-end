import styled from "styled-components";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import ReactTooltip from "react-tooltip";

export default function Likes({ post, setDependency, fetchDependency }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const { token } = useContext(UserContext);
  const [names, setNames] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const promise = axios.get(
      `https://linkr-driven.herokuapp.com/likes/${post.id}`,
      config
    );
    const promise2 = axios.get(
      `https://linkr-driven.herokuapp.com	/likes/count/${post.id}`
    );
    const promise3 = axios.get(
      `https://linkr-driven.herokuapp.com	/likes/names/${post.id}`,
      config
    );
    promise.then((response) => {
      if (response.data) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    });
    promise2.then((response) => {
      setLikes(Number(response.data.count));
    });

    promise3.then((response) => {
      const nameResponse = response.data;
      setNames(nameResponse);
    });

    promise.catch((error) => {
      alert("An error has occurred");
    });

    promise2.catch((error) => {
      alert("An error has occurred");
    });

    promise3.catch((error) => {
      alert("An error has occurred");
    });
  }, [post]);

  function like() {
    const promise = axios.post(
      `https://linkr-driven.herokuapp.com	/likes`,
      {
        postId: post.id,
      },
      config
    );
    promise.then((response) => {
      if (response.status === 201) {
        setDependency(!fetchDependency);
        setIsLiked(true);
        setLikes(likes + 1);
      }
    });

    promise.catch((error) => {
      alert("It was not possible to like the post");
    });

    const promise2 = axios.get(
      `https://linkr-driven.herokuapp.com	/likes/names/${post.id}`,
      config
    );
    promise2.then((response) => {
      const nameResponse = response.data;
      setNames(nameResponse);
    });
    promise2.catch((error) => {
      alert("It was not possible to like the post");
    });
  }

  function dislike() {
    const promise = axios.delete(
      `https://linkr-driven.herokuapp.com	/likes/${post.id}`,
      config
    );
    promise.then((response) => {
      if (response.status === 200) {
        setDependency(!fetchDependency);
        setIsLiked(false);
        setLikes(likes - 1);
        const promise2 = axios.get(
          `https://linkr-driven.herokuapp.com	/likes/names/${post.id}`,
          config
        );
        promise2.then((response) => {
          const nameResponse = response.data;

          setNames(nameResponse);
        });
        promise2.catch((error) => {
          alert("It was not possible to dislike the post");
        });
      }
    });

    promise.catch((error) => {
      alert("It was not possible to dislike the post");
    });
  }

  return (
    <>
      {isLiked ? <FillHeart onClick={dislike} /> : <Heart onClick={like} />}
      <a data-tip data-for={`${post.id}`}>
        <span>{likes} likes</span>
      </a>
      {isLiked ? (
        <ReactTooltip id={`${post.id}`} place="bottom" type="light">
          Voc??
          {names.length > 0
            ? `, ${names[0].name} and others ${likes - 2} people`
            : ` and others 0 people`}
        </ReactTooltip>
      ) : (
        <ReactTooltip id={`${post.id}`} place="bottom" type="light">
          {names.length > 1
            ? `${names[0].name}, ${names[1].name} and others ${
                likes - 2
              } people`
            : names.length === 1
            ? `${names[0].name} and others 0 people`
            : "0 likes"}
        </ReactTooltip>
      )}
    </>
  );
}

//style icons:

const Heart = styled(FiHeart)`
  width: 20px;
  height: 20px;
  color: #ffffff;
  cursor: pointer;
`;

const FillHeart = styled(AiFillHeart)`
  width: 20px;
  height: 20px;
  color: red;
  cursor: pointer;
`;
