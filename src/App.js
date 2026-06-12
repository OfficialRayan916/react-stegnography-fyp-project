import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import ImageStego from "./pages/ImageStego";
import AudioStego from "./pages/AudioStego";
import VideoStego from "./pages/VideoStego";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/imageStego" element={<ImageStego />} />
        <Route path="/audioStego" element={<AudioStego />} />
        <Route path="/videoStego" element={<VideoStego />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;