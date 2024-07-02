import { useState } from "react"
import Login from "./components/LogIn/Login"
import Timer from "./components/Timer/Timer"
import ListeningTest from "./components/ListeningTest/ListeningTest"
import ReadingTest from "./components/ReadingTest/ReadingTest"
import ListeningTestCards from "./components/ListeningTestCards/ListeningTestCards"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import TestEvaluation from "./components/TestEvaluation/TestEvaluation"
import Footer from "./components/Footer/Footer"
import Demo from "./components/demo"
import Material from "./components/Material/Material"
import Questions from "./components/Questions/Questions"
import ReadingTestCards from "./components/ReadingTestCards/ReadingTestCards"
import Contact from "./components/Contact/Contact"
import AboutUs from "./components/AboutUs/AboutUs"
import AdminTestPage from "./components/AdminTestPage/AdminTestPage"
import Dashboard from "./components/Dashboard/Dashboard"



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };
 
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/testcards" element={<ListeningTestCards/>} />
    <Route path="/contactus" element={<Contact/>} />
    <Route path="/aboutus" element={<AboutUs/>} />
    <Route path="/readingtestcards" element={<ReadingTestCards/>} />
    <Route path="/listeningtest/:testId" element={<ListeningTest/>} />
    <Route path="/readingtest/:testId" element={<ReadingTest/>} />
    <Route path="/testevaluation/:testId" element={<TestEvaluation/>} />
    <Route path="/material" element={<ProtectedRoute element={<Material />} />} />
    <Route path="/question" element={<ProtectedRoute element={<Questions />} />} />
    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
    <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
    <Route path="/admintest" element={<ProtectedRoute element={<AdminTestPage />} />} />
   
    
    </Routes>
    <Footer/>
    </BrowserRouter>
      
    </>
  )
}

export default App
