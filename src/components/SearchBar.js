import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import {BsFillCircleFill} from "react-icons/bs"
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import { getUsers } from "../services/users";
import UserContext from "../context/UserContext";
export default function SearchBar({ fetchDependency, setDependency }) {
      const navigate = useNavigate();
      const [visible, setVisible] = useState(false);
      const [value, setValue] = useState("");
      const [users, setUsers] = useState([]);
   

  
      useEffect(() => {
       const userId = localStorage.getItem("userId")
        async function fetchData() {
          const users = await getUsers(value, userId);
          setUsers(users);
          
        }
        setVisible(value.length === 0 ? false : true);
    
        fetchData();
      }, [value]);

      
      function redirectUser(id) {
        setDependency(!fetchDependency);
        navigate(`/user/${id}`);
      }
 
    return (
        <SearchBarSection visible={visible}>
            <div className="search">
                <DebounceInput
                    className="SearchBar"
                    minLength={3}
                    debounceTimeout={300}
                    placeholder="Search for people"
                    onClick={(event) => {
                        event.preventDefault();
                    }}
                    onChange={async event => {
                        setValue(event.target.value.trim())

                    }
                    } />
                <Heart />
            </div>
            <Suggestions visible={visible}>
                {users.length > 0
                    ? users.map((user, index) => (
                        <div key={index} className="userSection">
                            <img alt="user profile"
                                src={user.imageProfile}
                                onClick={() => {
                                    redirectUser(user.userid)
                                    setVisible(false)
                                }}
                            />
                            <span onClick={() => {
                                redirectUser(user.userid)
                                setVisible(false)
                            }}>
                                {user.name}
                            </span>
                            {user.followedby ? <span className="statusFollow"><BsFillCircleFill className="circle"/> following</span>: ""}
                            
                        </div>
                    ))
                    : "Searching for users..."}
            </Suggestions>
        </SearchBarSection>
    )
}

const SearchBarSection = styled.div`
  width: 50%;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 176px;
  border-radius: 8px;
  background-color: ${(props) => (props.visible ? "#E7E7E7" : "none")};

  .search {
    display: flex;
    width: 100%;
    height: 45px;

    .SearchBar {
      border-radius: 8px 0px 0px 8px;
      width: 100%;
      border: none;
      outline: none;
      color: black;
      font-family: "Lato";
      font-size: 16px;
      padding-left: 12px;
    }

    ::placeholder {
      color: #c6c6c6;
      padding-left: 12px;
    }
  }

  @media (max-width: 611px) {
    width: 90%;
  position: absolute;
  top: 82px;
  left: 50%;
  transform: translate(-50%, 0);
  }
`;

const Suggestions = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  background-color: #e7e7e7;
  height: 100%;
  width: 100%;
  color: #515151;
  padding: 16px 14px;
  border-radius: 0px 0px 8px 8px;
  

  .userSection {
    width: auto;
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    span {
      cursor: pointer;
      margin-left: 8px;
    }

    img {
      cursor: pointer;
      width: 40px;
      height: 40px;
    }

    :hover {
      background-color: #EFEFEF;
      border-radius: 5px;
    }

    .circle{
      height: 10px;
    }

    .statusFollow{
      color: #c5c5c5;
    }
  }
  overflow-y: scroll;
  ::-webkit-scrollbar {
    background:none;
    width: 8px;
    height: 2 em;
     
  
  }

  ::-webkit-scrollbar-track {
    background-color: #EFEFEF;
  border-radius: 100vw;
  margin-block: 0.5em;
}

::-webkit-scrollbar-thumb {
  width: 5px;
  height: 0.5em;
  background: black;
  border: 0.25em solid red 3px;
  border-radius: 100vw;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--ligthgray);
  border-radius: 16px;
} 
`;


const Heart = styled(AiOutlineSearch)`
  width: 8%;
  height: 20px;
  color: #c6c6c6;
  background-color: white;
  height: 45px;
  border-radius: 0px 8px 8px 0px;
  padding-right: 10px;
  cursor: pointer;

 
`;