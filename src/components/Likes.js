import styled, { withTheme } from "styled-components";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { useState, useContext, useRef, useEffect } from "react";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";

export default function Likes({ post, userId, setDependency, fetchDependency }) {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [isEditing, setEditing] = useState(false);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const { token } = useContext(UserContext);
    const [names, setNames] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const promise = axios.get(`http://localhost:4000/likes/${post.id}`, config);
        const promise2 = axios.get(`http://localhost:4000/likes/count/${post.id}`);
        const promise3 = axios.get(`http://localhost:4000/likes/names/${post.id}`, config);
        promise.then((response) => {
            if (response.data) {
                setIsLiked(true);
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
            console.error("error");
        });

        promise2.catch((error) => {
            console.error("error");
        });

        promise3.catch((error) => {
            console.error("error");
        });
    }, []);

    function like() {
        const promise = axios.post(
            `http://localhost:4000/likes`,
            {
                postId: post.id,
            },
            config
        );
        promise.then((response) => {
            if (response.status === 201) {
                setIsLiked(true);
                setLikes(likes + 1);
            }
        });

        promise.catch((error) => {
            console.error("error");
        });

        const promise2 = axios.get(
            `http://localhost:4000/likes/names/${post.id}`,
            config
        );
        promise2.then((response) => {
            const nameResponse = response.data;
            setNames(nameResponse);
        });
        promise2.catch((error) => {
            console.error("error");
        });
    }

    function dislike() {
        const promise = axios.delete(
            `http://localhost:4000/likes/${post.id}`,
            config
        );
        promise.then((response) => {
            if (response.status === 200) {
                setIsLiked(false);
                setLikes(likes - 1);
                const promise2 = axios.get(
                    `http://localhost:4000/likes/names/${post.id}`,
                    config
                );
                promise2.then((response) => {
                    const nameResponse = response.data;

                    setNames(nameResponse);
                });
                promise2.catch((error) => {
                    console.error("error");
                });
            }
        });

        promise.catch((error) => {
            console.error("error");
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
                    Você
                    {names.length > 0
                        ? `, ${names[0].name} and others ${likes - 2} people`
                        : ` and others 0 people`}
                </ReactTooltip>
            ) : (
                <ReactTooltip id={`${post.id}`} place="bottom" type="light">
                    {names.length > 1
                        ? `${names[0].name}, ${names[1].name} and others ${likes - 2
                        } people`
                        : names.length === 1
                            ? `${names[0].name} and others 0 people`
                            : "0 likes"}
                </ReactTooltip>
            )}
        </>
    )
}

//style icons:

const Heart = styled(FiHeart)`
  width: 20px;
  height: 20px;
  color: #ffffff;
`;

const FillHeart = styled(AiFillHeart)`
  width: 20px;
  height: 20px;
  color: red;
`;