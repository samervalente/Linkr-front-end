import styled from "styled-components";
import { AiOutlineDown, AiOutlineUp, AiOutlineSearch } from "react-icons/ai";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { DebounceInput } from "react-debounce-input";
import { getUsers } from "../services/users";


export default function Top({ fetchDependency, setDependency }) {
  const {
    setToken,
    imageProfile,
    setImageProfile,
    menuDisplay,
    setMenuDisplay,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);


  function checkMenu() {
    if (menuDisplay) {
      setMenuDisplay(false);
    }
  }
  function menu() {
    if (menuDisplay) {
      setMenuDisplay(false);
    } else {
      setMenuDisplay(true);
    }
  }

  function redirectUser(id) {
    setDependency(!fetchDependency);
    navigate(`/user/${id}`);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    localStorage.removeItem("image");
    setImageProfile("");
    navigate("/");
  }

  useEffect(() => {
    async function fetchData() {
      const users = await getUsers(value);
      setUsers(users);
    }
    setVisible(value.length === 0 ? false : true);

    fetchData();
  }, [value]);

  return (
    <Conteiner>
      <Header onClick={checkMenu}>
        <Link to="/timeline">
          <h1>linkr</h1>
        </Link>

        {/*Search Bar */}
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
               <Heart  />
          </div>
          <Suggestions visible={visible}>
            {users.length > 0
              ? users.map((user) => (
                  <div className="userSection">
                    <img alt="user profile"
                      src={user.imageProfile}
                      onClick={() => {
                        redirectUser(user.id)
                        setVisible(false)
                      }}
                    />
                    <span onClick={() => {
                      redirectUser(user.id)
                      setVisible(false)
                    }}>
                      {user.name}
                    </span>
                  </div>
                ))
              : "Searching for users..."}
          </Suggestions>
        </SearchBarSection>

        <ImageSide onClick={menu}>
          {menuDisplay ? (
            <AiOutlineUp color="white" size="26px" />
          ) : (
            <AiOutlineDown color="white" size="26px" />
          )}
          <img src={imageProfile} alt="user" />
        </ImageSide>
      </Header>
      {menuDisplay ? (
        <Logout>
          <div onClick={logout}>
            <span>Logout</span>
          </div>
        </Logout>
      ) : (
        <></>
      )}
    </Conteiner>
  );
}

const Conteiner = styled.div`
  height: 72px;
  width: 100%;
  background-color: #151515;
  position: fixed;
  top: 0;
  z-index: 1;

  a {
    text-decoration: none;
  }
  h1 {
    font-family: "Passion One", cursive;
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    color: #ffffff;
    margin-top: 10px;
  }
  img {
    width: 53px;
    height: 53px;
    object-fit: cover;
    border-radius: 26.5px;
  }
`;

const ImageSide = styled.div`
  display: flex;
  width: 86px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 25px;
  height: 100%;
  color: white;
`;

const SearchBarSection = styled.div`
  width: 40%;
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
      margin-left: 12px;
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

const Logout = styled.div`
  height: 40px;
  width: 120px;
  position: fixed;
  right: 0;
  border-radius: 0px 0px 0px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #171717;
  span {
    color: #ffffff;
    size: 17px;
    cursor: pointer;
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
