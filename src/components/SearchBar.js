import styled from "styled-components";
import UserContext from "../context/UserContext";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillCircleFill } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import { getUsers } from "../services/users";
export default function SearchBar({ fetchDependency, setDependency }) {

  const navigate = useNavigate();
  const [visible, setSuggestionsVisibily] = useState(false);
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  const { token } = useContext(UserContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  
  function redirectUser(id) {
    setDependency(!fetchDependency);
    navigate(`/user/${id}`);
  }

  useEffect(() => {
    async function SearchUsers(){
      if(value.length > 0 ){
        const users = await getUsers(value, config);
        setUsers(users)
      }
      setSuggestionsVisibily(value.length === 0? false : true)
    }
    SearchUsers()
  },[value])

  
  return (
    <SearchBarSection visible={visible}>
      <div className="search">
        <DebounceInput
          className="SearchBar"
          minLength={3}
          debounceTimeout={300}
          placeholder="Search for people"
          onClick={(event) => {
            event.preventDefault()}}
          onChange={(event) => {setValue(event.target.value)}}
        />
        <Heart />
      </div>
      <Suggestions visible={visible}>
        {users.length > 0
          ? users.map((user, index) => (
              <div key={index} className="userSection">
                <img
                  alt="user profile"
                  src={user.imageProfile}
                  onClick={() => {
                    redirectUser(user.userid);
                    setSuggestionsVisibily(false);
                  }}
                />
                <span
                  onClick={() => {
                    redirectUser(user.userid);
                    setSuggestionsVisibily(false);
                  }}
                >
                  {user.name}
                </span>
                {user.followedby ? (
                  <span className="statusFollow">
                    <BsFillCircleFill className="circle" /> following
                  </span>
                ) : (
                  ""
                )}
              </div>
            ))
          : "Searching for users..."}
      </Suggestions>
    </SearchBarSection>
  );
}

const SearchBarSection = styled.div`
  width: 50%;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${(props) => (props.visible ? "174px" : "")};
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
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction:column;
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
      border-radius: 50%;
      cursor: pointer;
      width: 40px;
      height: 40px;
    }

    :hover {
      background-color: #efefef;
      border-radius: 5px;
    }

    .circle {
      height: 7px;
    }

    .statusFollow {
      color: #c5c5c5;
    }
  }

  overflow-y: scroll;
  ::-webkit-scrollbar {
    background: none;
    width: 8px;
    height: 2 em;
  }
  ::-webkit-scrollbar-track {
    background-color: #efefef;
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

  @media (max-width: 611px) {
    
    
  }

  z-index: 1;
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
