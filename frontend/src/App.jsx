import { Route, Routes, useLocation } from "react-router-dom";
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import './App.css'
import Login from './pages/Login';
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import UnderConstruction from "./pages/UnderConstruction";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname==="/login" || location.pathname==="/register";

  return (
    <>
      <ChakraProvider value={defaultSystem}>
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<UnderConstruction />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ChakraProvider>
    </>
  )
}

export default App;