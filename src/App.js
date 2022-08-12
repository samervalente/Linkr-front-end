import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Timeline from "./pages/Timeline";
import TimelineByHashtag from "./pages/TimelineByHashtag";
import User from "./pages/User.js";
import UserContext from "./context/UserContext";

function App() {
  const [token, setToken] = useState("");
  const [imageProfile, setImageProfile] = useState("");
  const [menuDisplay, setMenuDisplay] = useState(false);
  const contextValue = {
    token,
    setToken,
    imageProfile,
    setImageProfile,
    menuDisplay,
    setMenuDisplay,
  };
  return (
    <UserContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/hashtag/:hashtag" element={<TimelineByHashtag />} />
          <Route path="/user/:id" element={<User />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
