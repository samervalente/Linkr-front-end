import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Timeline from "./pages/Timeline";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/signup" element={<Register/>} />
            <Route path='/timeline' element={<Timeline />} /> 
        </Routes>
    </BrowserRouter>
  );
}

export default App;
