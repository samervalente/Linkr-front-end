import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/signup" element={<Register/>} />    
        </Routes>
    </BrowserRouter>
  );
}

export default App;
