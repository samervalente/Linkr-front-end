import styled from "styled-components";
import Top from "../components/Top";
import FetchPosts from "../components/FetchPosts";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import { getTrending } from "../services/post";
import { Oval } from "react-loader-spinner";

export default function Timeline() {
  const navigate = useNavigate();

  const [posts, setPost] = useState([]);
  const [userId, setUserId] = useState("");
  const { token, imageProfile, menuDisplay, setMenuDisplay, setPage } =
    useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const { hashtag } = useParams();
  const [fetchDependency, setDependency] = useState(false);

  useEffect(() => {
    if (!token || !imageProfile) {
      setPage(`hashtag/${hashtag}`);
      navigate("/");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(
      `https://linkr-driven.herokuapp.com/posts/${hashtag}`,
      config
    );
    promise.then((response) => {
      setPost(response.data.posts);
      setUserId(response.data.userId);
      setIsLoading(false);
    });

    promise.catch(() => alert("Unable to render posts"));
  }, [fetchDependency]);

  useEffect(() => {
    async function fetchData() {
      const trendingTopics = await getTrending();
      setTrending(trendingTopics);
    }

    fetchData();
  }, [fetchDependency]);

  function checkMenu() {
    if (menuDisplay) {
      setMenuDisplay(false);
    }
  }

  function fetchPostsByHashtagName(name) {
    setDependency(!fetchDependency);
    setIsLoading(false);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.get(
      `https://linkr-driven.herokuapp.com/posts/${name}`,
      config
    );
    promise.then((response) => {
      setPost(response.data.posts);
    });
  }

  const trendingTopics =
    trending.length > 0
      ? trending.map((hashtag, index) => {
          return (
            <Link key={index} to={`/hashtag/${hashtag.tag}`}>
              <li onClick={() => fetchPostsByHashtagName(hashtag.tag)}>
                #{hashtag.tag}
              </li>
            </Link>
          );
        })
      : "Searching for hashtags...";

  return (
    <Conteiner onClick={checkMenu}>
      <Top setDependency={setDependency} fetchDependency={fetchDependency} />
      <Content>
        <Title># {hashtag}</Title>
        <Sides>
          <RightSide>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <FetchPosts
                  key={index}
                  post={post}
                  userId={userId}
                  setTrending={setTrending}
                  setDependency={setDependency}
                  fetchDependency={fetchDependency}
                />
              ))
            ) : isLoading ? (
              <>
                <Load>"Carregando posts..."</Load>
                <Oval />
              </>
            ) : (
              <Load>There are no posts with this tag</Load>
            )}
          </RightSide>
          <LeftSide>
            <div className="trendingTitle">
              <h1>trending</h1>
            </div>
            <div className="divBar"></div>
            <ul>{trendingTopics}</ul>
          </LeftSide>
        </Sides>
      </Content>
    </Conteiner>
  );
}

const Conteiner = styled.div`
  display: flex;
  justify-content: center;
  background-color: #333333;
  min-height: 100vh;
  padding-top: 150px;

  @media (max-width: 611px) {
    padding-top: 91px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 611px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
  margin-bottom: 40px;

  @media (max-width: 611px) {
    margin-left: 17px;
    font-size: 33px;
    margin-bottom: 20px;
  }
`;

const Sides = styled.div`
  display: flex;
`;

const RightSide = styled.div`
  width: 611px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 611px) {
    width: 100%;
  }
`;

const LeftSide = styled.div`
  width: 301px;
  height: 406px;
  background-color: #171717;
  border-radius: 16px;
  margin-left: 25px;
  color: white;
  font-family: "Oswald";

  .trendingTitle {
    padding: 10px 16px;
    h1 {
      font-size: 27px;
    }
  }

  .divBar {
    width: 100%;
    background: rgba(72, 72, 72, 1);
    border: 1px solid rgba(72, 72, 72, 1);
  }

  ul {
    height: 80%;
    padding: 10px 16px;

    li {
      cursor: pointer;
      margin-bottom: 12px;
      font-size: 19px;
    }

    a {
      text-decoration: none;
      color: white;
    }

    overflow: auto;

    ::-webkit-scrollbar {
      background: none;
      width: 8px;
      height: 2 em;
    }

    ::-webkit-scrollbar-track {
      background-color: #171717;
      border-radius: 100vw;
      margin-block: 0.5em;
    }

    :-webkit-scrollbar-thumb {
      width: 5px;
      background: hsl(120 100% 20% / 1);
      border: 0.25em solid red 3px;
      border-radius: 100vw;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--ligthgray);
      border-radius: 16px;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

const Load = styled.div`
  font-family: "Lato";
  color: #ffffff;
  margin-top: 20px;
  margin-bottom: 40px;
`;
