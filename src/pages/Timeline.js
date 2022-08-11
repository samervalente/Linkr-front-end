import styled from "styled-components";
import CreatePost from "../components/CreatePost";
import Top from "../components/Top";
import FetchPosts from '../components/FetchPosts';
import { useContext, useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from 'axios';
import { getTrending } from "../services/post";
import { Oval} from "react-loader-spinner";
import Modal from "react-modal";

Modal.setAppElement('#root');

export default function Timeline() {
  const navigate = useNavigate();
  const [posts, setPost] = useState([]);
  const [userId, setUserId] = useState('');
  const { token, imageProfile, menuDisplay, setMenuDisplay } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [trending, setTrending] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fetchDependency, setDependency] = useState(false)

  useEffect(() => {
    if (!token || !imageProfile) {
      navigate('/');
      return
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    
    const promise = axios.get(`http://localhost:4000/posts`, config);
    promise.then(response => {
      setPost(response.data.posts);
      setUserId(response.data.userId);
      setIsLoading(false)
    });

    promise.catch((error) => {
      console.error("error")
      setIsModalOpen(true)
    });
  }, [fetchDependency]);

  const customStyle = { 
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
  }

  useEffect( () => {
    async function fetchData(){
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      
      const trendingTopics = await getTrending(config)
      setTrending(trendingTopics)
    }
   
    fetchData()
    
  }, [])

  function closeModal(){
    if(isModalOpen)
      setIsModalOpen(false)
  }

  function checkMenu() {
    if (menuDisplay) {
      setMenuDisplay(false);
    }
  }

  const trendingTopics = trending.length > 0? 
  trending.map((hashtag) => {
    return <Link to={`/hashtag/${hashtag.tag}`}>
          <li>#{hashtag.tag}</li>
      </Link>
  }):  "Searching for hashtags..."

  return (
    <Conteiner onClick={checkMenu}>
      <Top />
      <Content>
        <Title>timeline</Title>
        <Sides>
          <RightSide>
            {<CreatePost token={token} imageProfile={imageProfile} setPost={setPost} setUserId={setUserId} setTrending={setTrending} />}
            {
              <>{posts.length > 0 ? posts.map((post, index) => {
                return (
                  <FetchPosts key={index} post={post} userId={userId} setTrending={setTrending} setDependency={setDependency} fetchDependency={fetchDependency}  />
                )}): "Carregando posts..."
                }
              </>
            }
            {isLoading && <Oval />}
            {!isLoading && posts.length === 0 && (
              <p>There are no posts yet</p>
            )}
            {isModalOpen ? 
              <Modal isOpen={isModalOpen} style={customStyle}>
                <h2>An error occured while trying to fetch the posts, please refresh the page</h2>
                <button onClick={closeModal}>Ok</button>
              </Modal> 
              : 
              <></>}
          </RightSide>
          
          <LeftSide>
              <div className="trendingTitle">
                <h1>trending</h1>
              </div>
              <div className="divBar"></div>
              <ul>
              {trendingTopics}
              </ul>
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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
  margin-bottom: 40px;
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

`;

const LeftSide = styled.div`
  width: 301px;
  height: 406px;
  background-color: #171717;
  border-radius: 16px;
  margin-left: 25px;
  color:white;

  font-family: 'Oswald';

  .trendingTitle{
    padding: 10px 16px;
    h1{
    font-size: 27px;
  }
  }

  .divBar{
    width: 100%;
    background: rgba(72, 72, 72, 1);
    border: 1px solid rgba(72, 72, 72, 1)
  }

  ul{
    
    height: 80%;
    padding: 10px 16px;

    li{
      cursor: pointer;
      margin-bottom: 12px;
      font-size:19px;
    }

    a{
      text-decoration: none;
      color:white;
    }

    overflow:auto;

    ::-webkit-scrollbar {
    background:none;
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




`;


