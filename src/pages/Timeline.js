import styled from "styled-components";
import CreatePost from "../components/CreatePost";
import Top from "../components/Top";
import FetchPosts from '../components/FetchPosts';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from 'axios';
import { getTrending } from "../services/post";
import { Oval} from "react-loader-spinner";

export default function Timeline() {
  const navigate = useNavigate();
  const [posts, setPost] = useState([]);
  const { token, imageProfile, menuDisplay, setMenuDisplay } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [trending, setTrending] = useState([])

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
      setPost([])
      setIsLoading(false)
    })

    promise.catch(response => console.log("erro"))
  }, []);

  useEffect( () => {
    async function fetchData(){
      const trendingTopics = await getTrending()
      setTrending(trendingTopics)
    }
   
    fetchData()
    
  }, [])

  function checkMenu() {
    if (menuDisplay) {
      setMenuDisplay(false);
    }
  }
  return (
    <Conteiner onClick={checkMenu}>
      <Top />
      <Content>
        <Title>timeline</Title>
        <Sides>
          <RightSide>
            {<CreatePost token={token} imageProfile={imageProfile} setPost={setPost} />}
            {
              <>{posts.map(post => {
                  return (
                    <FetchPosts post={post} />
                  )})
                }
              </>
            }
            {isLoading && <Oval />}
            {!isLoading && posts.length === 0 && (
              <p>There are no posts yet</p>
            )}
          </RightSide>
          <LeftSide>
              <div className="trendingTitle">
                <h1>trending</h1>
              </div>
              <div className="divBar"></div>
              <ul>
              {trending.length > 0 ? trending.map(obj => <li>#{obj.tag}</li>): "Carregando..."}
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
    padding: 10px 16px;

    li{
      margin-bottom: 12px;
      font-size:19px;
    }
  }

  color:white;
`;


