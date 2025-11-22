import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import SingleChat from "./pages/SingleChat";

const App = () => {
  return (
    <div>
      <h1>App</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/single-chat" element={<SingleChat />} />
      </Routes>
    </div>
  );
};

export default App;
