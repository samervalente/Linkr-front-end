import styled from "styled-components";
import { BiRepost } from "react-icons/bi";
import Modal from "react-modal";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

Modal.setAppElement("#root");

export default function Reposts({post, setDependency, fetchDependency}){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [repost, setRepost] = useState([]); 
    const {token} = useContext(UserContext);
  
    function openModal() {
        setIsModalOpen(true);
      }

    function closeModal() {
    setIsModalOpen(false);
    }

    function getReposts(){
    
      const body = {};

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
  
      const promise = axios.post(`http://localhost:4000/reposts/${post.id}`, body, config);
      promise.then((response) => {
        setRepost([]);
        setDependency(!fetchDependency);
        setIsModalOpen(false)
        
      });
  
      promise.catch((error) => {
        console.error("error");
      });
      }

    return(
        <>
            <Repost onClick={openModal} />
            {isModalOpen ? (
                <Dialog isOpen={isModalOpen}>
                <h2>Do you want to re-post this link?</h2>
                <div>
                    <No onClick={closeModal}>No, cancel</No>
                    <Yes onClick={getReposts}>Yes, share!</Yes>
                </div>
                </Dialog>
            ) : (
                <></>
            )}
        </>
    )
}

const Repost = styled(BiRepost)`
    color: #FFFFFF;
    width: 30px;
    height: 25px;
    margin-top: 20px;
    cursor: pointer;
`;

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

