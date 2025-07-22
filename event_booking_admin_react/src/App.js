import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Artist from "./Pages/Artist";
import Users from "./Pages/Users";
import OldEvent from "./Pages/OldEvent";
import NewBooking from "./Pages/NewBooking";
import Payment from "./Pages/Payment";
import Complain from "./Pages/Complain";
import Feedback from "./Pages/Feedback";
import Login from "./Pages/Login";
import axios from "axios";
import { useEffect, useState } from "react";
import checkSession from "./auth/authService";
import UpcomingEvent from "./Pages/UpcomingEvents/UpcomingEvent";
import Home from "./Pages/Home/Home";

function App() {
  axios.defaults.withCredentials = true;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  //for checking session 
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const isAuthenticated = await checkSession();
        setIsAuthenticated(isAuthenticated);

      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Set loading to false after authentication check
      }
    };
    if (!isAuthenticated) {
      authenticateUser(); // Check session only if user is not authenticated
    } else {
      setLoading(false); // Set loading to false immediately if user is authenticated
    }

  }, [isAuthenticated]);

  // Render routes only after loading is false and isAuthenticated is determined
  if (loading) {
    return <h3 style={{ textAlign: "center" }} >Loading...</h3>;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login.html" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login.html" />} />
          <Route path="/artist.html" element={isAuthenticated ? <Artist /> : <Navigate to="/login.html" />} />
          <Route path="/user.html" element={isAuthenticated ? <Users /> : <Navigate to="/login.html" />} />
          <Route path="/upcomingevent.html" element={isAuthenticated ? <UpcomingEvent /> : <Navigate to="/login.html" />} />
          <Route path="/oldevent.html" element={isAuthenticated ? <OldEvent /> : <Navigate to="/login.html" />} />
          <Route path="/newbooking.html" element={isAuthenticated ? <NewBooking /> : <Navigate to="/login.html" />} />
          <Route path="/payment.html" element={isAuthenticated ? <Payment /> : <Navigate to="/login.html" />} />
          <Route path="/complain.html" element={isAuthenticated ? <Complain /> : <Navigate to="/login.html" />} />
          <Route path="/feedback.html" element={isAuthenticated ? <Feedback /> : <Navigate to="/login.html" />} />
          <Route path="*" element={isAuthenticated ? <h1> 404 Page Not Found</h1> : <Navigate to="/login.html" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
