import styled from "styled-components";
import Top from "../components/Top";
import FetchPosts from "../components/FetchPosts";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import { getTrending } from "../services/post";
import { followUnfollowUser } from "../services/users";
import { Oval } from "react-loader-spinner";
import Modal from "react-modal";
import SearchBar from "../components/SearchBar";
import InfiniteScroll from "react-infinite-scroller";
import LoadingScroll from "../shared/LoadingScroll";

Modal.setAppElement("#root");

export default function User() {
  const navigate = useNavigate();
  const [posts, setPost] = useState([]);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const { token, imageProfile, menuDisplay, setMenuDisplay, setPage } =
    useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchDependency, setDependency] = useState(false);
  const [follow, setFollow] = useState(false);
  const [reqProcess, setReqProcess] = useState(false);
  const { id } = useParams();
  const [more, setMore] = useState(true);
  const [nextPage, setNextPage] = useState(0);
  const [firstLoad, setFirstLoad] = useState(false);

  function loadPostScroll() {
    if (!token || !imageProfile) {
      setPage(`user/${id}`);
      navigate("/");
      return;
    }
    if (nextPage === 0) {
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(
      `https://linkr-driven.herokuapp.com/user/posts/${id}?page=${nextPage}`,
      config
    );
    promise.then(async (response) => {
      setPost([...posts, ...response.data.posts]);
      setMore(response.data.posts.length > 0 ? true : false);
      setUserId(response.data.userId);
      setIsLoading(false);
      setNextPage(nextPage + 1);
      const status = await followUnfollowUser(
        { userId: response.data.userId, followedId: id },
        "status"
      );
      setFollow(status);
    });

    promise.catch((error) => {
      setIsModalOpen(true);
    });
  }

  useEffect(() => {
    if (!token || !imageProfile) {
      setPage(`user/${id}`);
      navigate("/");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(
      `https://linkr-driven.herokuapp.com/user/posts/${id}`,
      config
    );
    const promise2 = axios.get(`https://linkr-driven.herokuapp.com/find/${id}`);

    promise.then(async (response) => {
      setPost(response.data.posts);
      setUserId(response.data.userId);
      setIsLoading(false);
      setNextPage(1);
      setMore(true);
      setFirstLoad(true);
      const status = await followUnfollowUser(
        { userId: response.data.userId, followedId: id },
        "status"
      );
      setFollow(status);
    });
    promise.catch((error) => {
      setIsModalOpen(true);
    });

    promise2.then((response) => {
      setName(response.data.name);
    });

    promise2.catch((error) => {
      setIsModalOpen(true);
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

  async function followUser() {
    setReqProcess(true);
    const body = {
      userId,
      followedId: id,
    };
    await followUnfollowUser(body, "follow");
    setFollow(!follow);
    setReqProcess(false);
  }

  async function unfollowUser() {
    setReqProcess(true);
    const body = {
      userId,
      followedId: id,
    };
    await followUnfollowUser(body, "unfollow");
    setFollow(!follow);
    setReqProcess(false);
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
        <Title>
          {name ? `${name}'s posts` : "Pagina não encontrada!"}

          {id != userId ? (
            follow ? (
              <FollowButton
                disable={reqProcess}
                variant={"unfollow"}
                onClick={unfollowUser}
              >
                {reqProcess ? <Oval height="20" color="white" /> : "Unfollow"}
              </FollowButton>
            ) : (
              <FollowButton
                disable={reqProcess}
                variant={"follow"}
                onClick={followUser}
              >
                {reqProcess ? <Oval height="20" color="white" /> : "Follow"}
              </FollowButton>
            )
          ) : (
            ""
          )}
        </Title>
        <Sides>
          <RightSide>
          <InfiniteScroll
              style={{width: '100%'}}
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
                <Load>"Carregando posts..."</Load>
                <Oval color="#6D6D6D" secondaryColor="rgba(0,0,0,0)" />
              </>
            ) : (
              <Load>There are no posts yet</Load>
            )}
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
            </InfiniteScroll>
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
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    cursor: pointer;
  }

  @media (max-width: 611px) {
    margin-left: 17px;
    font-size: 33px;
    margin-bottom: 20px;
  }
`;

const FollowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 112px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) =>
    props.variant === "follow" ? "#1877F2;" : "white;"};
  color: ${(props) => (props.variant === "unfollow" ? "#1877F2;" : "white;")};
  font-family: "Lato";
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
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

const LeftSide = styled.div`
  width: 301px;
  height: 406px;
  background-color: #171717;
  border-radius: 16px;
  margin-left: 25px;
  color: white;
  font-family: "Oswald";
  position: -webkit-sticky;
  position: sticky;
  top: 100px;

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
