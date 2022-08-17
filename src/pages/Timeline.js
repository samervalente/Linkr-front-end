import styled from "styled-components";
import useInterval from "use-interval";
import CreatePost from "../components/CreatePost";
import Top from "../components/Top";
import FetchPosts from "../components/FetchPosts";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import { getPosts, getTrending } from "../services/post";
import { Oval } from "react-loader-spinner";
import Modal from "react-modal";
import SearchBar from "../components/SearchBar";
import NewPostsButton from "../shared/newPostsButton";
import InfiniteScroll from "react-infinite-scroller";
import LoadingScroll from "../shared/LoadingScroll";

Modal.setAppElement("#root");

export default function Timeline() {
  const navigate = useNavigate();
  const [posts, setPost] = useState([]);
  const [countPost, setCountPost] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [haveNewPost, setHaveNewPost] = useState(false);
  const [userId, setUserId] = useState("");
  const { token, imageProfile, menuDisplay, setMenuDisplay, setPage } =
    useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchDependency, setDependency] = useState(false);
  const [more, setMore] = useState(true);
  const [nextPage, setNextPage] = useState(0);
  const [firstLoad, setFirstLoad] = useState(false);

  //console.log(`Posts atuais: ${countPost}`);
  //console.log(`Posts novos contados na requisição: ${newCount}`);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function loadPost() {
    const promise = axios.get(
      `https://linkr-driven.herokuapp.com/posts`,
      config
    );
    promise.then((response) => {
      setPost(response.data.posts);
      setCountPost(newCount);
      setHaveNewPost(false);
      setUserId(response.data.userId);
      setIsLoading(false);
    });

    promise.catch((error) => {
      console.error("error");
      setIsModalOpen(true);
    });
  }

  function loadPostScroll() {
    if (!token || !imageProfile) {
      setPage("timeline");
      navigate("/");
      return;
    }

    const promise = axios.get(
      `https://linkr-driven.herokuapp.com/posts?page=${nextPage}`,
      config
    );
    promise.then((response) => {
      setPost([...posts, ...response.data.posts]);
      setMore(response.data.posts.length > 0 ? true : false);
      setUserId(response.data.userId);
      setIsLoading(false);
      setNextPage(nextPage + 1);
    });

    promise.catch((error) => {
      console.error("error");
      setIsModalOpen(true);
    });
  }

  useInterval(() => {
    const promise = axios.get(
      "https://linkr-driven.herokuapp.com/postscount",
      config
    );
    promise.then((response) => {
      setNewCount(response.data.count);
      if (Number(countPost) < Number(newCount)) {
        setHaveNewPost(true);
      } else if (Number(countPost) > Number(newCount)) {
        setCountPost(newCount);
      }
    });

    promise.catch((error) => {
      console.error("error");
    });
  }, 15000);

  useEffect(() => {
    if (!token || !imageProfile) {
      setPage("timeline");
      navigate("/");
      return;
    }

    const promise = axios.get(
      `https://linkr-driven.herokuapp.com/posts`,
      config
    );
    promise.then((response) => {
      setPost(response.data.posts);
      setUserId(response.data.userId);
      setIsLoading(false);
      setNextPage(1);
      setMore(true);
      setFirstLoad(true);
    });

    promise.catch((error) => {
      console.error("error");
      setIsModalOpen(true);
    });

    const promise2 = axios.get(
      `https://linkr-driven.herokuapp.com/postscount`,
      config
    );
    promise2.then((response) => {
      setCountPost(response.data.count);
      setNewCount(response.data.count);
    });

    promise2.catch((error) => {
      console.error("error");
    });
  }, [fetchDependency]);

  const customStyle = {
    content: {
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
      justifyContent: "space-between",
    },
  };

  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const trendingTopics = await getTrending(config);
      setTrending(trendingTopics);
    }

    fetchData();
  }, [fetchDependency]);

  function closeModal() {
    if (isModalOpen) setIsModalOpen(false);
  }

  function checkMenu() {
    if (menuDisplay) {
      setMenuDisplay(false);
    }
  }

  const trendingTopics =
    trending.length > 0
      ? trending.map((hashtag, index) => {
          return (
            <Link key={index} to={`/hashtag/${hashtag.tag}`}>
              <li>#{hashtag.tag}</li>
            </Link>
          );
        })
      : "Searching for hashtags...";

  return (
    <Conteiner onClick={checkMenu}>
      <Top setDependency={setDependency} fetchDependency={fetchDependency} />
      <SearchBarBox>
        <SearchBar
          fetchDependency={fetchDependency}
          setDependency={setDependency}
        />
      </SearchBarBox>
      <Content>
        <Title>timeline</Title>
        <Sides>
          <RightSide>
            {
              <CreatePost
                imageProfile={imageProfile}
                setTrending={setTrending}
                setDependency={setDependency}
                fetchDependency={fetchDependency}
              />
            }
            {haveNewPost ? (
              <div onClick={loadPost}>
                <NewPostsButton countNewPosts={newCount - countPost} />
              </div>
            ) : (
              <></>
            )}
            <InfiniteScroll
              pageStart={0}
              loadMore={loadPostScroll}
              hasMore={more ? true : false}
              loader={firstLoad === true && <LoadingScroll key={0} />}
            >
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
                  <Load>Carregando posts...</Load>
                  <Oval color="#6D6D6D" secondaryColor="rgba(0,0,0,0)" />
                </>
              ) : (
                <Load>There are no posts yet</Load>
              )}
            </InfiniteScroll>
            {isModalOpen ? (
              <Modal isOpen={isModalOpen} style={customStyle}>
                <h2>
                  An error occured while trying to fetch the posts, please
                  refresh the page
                </h2>
                <button onClick={closeModal}>Ok</button>
              </Modal>
            ) : (
              <></>
            )}
          </RightSide>
          <SpaceForAlign></SpaceForAlign>
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
    padding-top: 146px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 611px) {
    width: 100%;
  }
`;

const SearchBarBox = styled.div`
  display: none;
  @media (max-width: 611px) {
    display: flex;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translate(-50%, 0);
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
  width: 100%;
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

const SpaceForAlign = styled.div`
  width: 301px;
`;

const LeftSide = styled.div`
  width: 301px;
  height: 406px;
  background-color: #171717;
  border-radius: 16px;
  margin-left: 25px;
  color: white;
  font-family: "Oswald";
  position: fixed;
  right: 460px;

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
