import { Route, Routes } from "react-router-dom";
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import './App.css'
import Login from './pages/Login';
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <>
      <ChakraProvider value={defaultSystem}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ChakraProvider>
    </>
  )
}

export default App;