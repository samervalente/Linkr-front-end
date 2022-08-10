
import styled from 'styled-components';
import CreatePost from '../components/CreatePost';
import Top from '../components/Top';
import FetchPosts from '../components/FetchPosts';
import { useContext, useEffect, useState} from "react";
import axios from 'axios';
import UserContext from "../context/UserContext";

export default function Timeline() {

    const [posts, setPost] = useState([]);
    const { token } = useContext(UserContext);

    
    useEffect(()=>{

        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

        const promise = axios.get(`${process.env.REACT_APP_API_URL}/posts`, config);
        promise.then(response => {
            console.log(response.data)
            setPost(response.data)
        })
        promise.catch(response => console.log("erro"))

    }, [])


    return (
        <Conteiner>
            <Top />
            <Content>
                <Title>timeline</Title>
                <Sides>
                    <RightSide>
                        {<CreatePost />}
                        {
                            posts.length !== 0
                            ?
                            <>{posts.map(post => {
                                return (
                                    <FetchPosts post={post} />
                                )
                            })}</>
                            :
                            <></>
                        }
                    </RightSide>
                    <LeftSide></LeftSide>
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
    font-family: 'Oswald', sans-serif;
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
`;

const LeftSide = styled.div`
    width: 301px;
    height: 406px;
    background-color: #171717;
    border-radius: 16px;
    margin-left: 25px;
`;

