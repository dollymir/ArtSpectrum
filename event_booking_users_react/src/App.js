import Home from './Pages/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import About from './Pages/About';
import ShowEvents from './Pages/ShowEvents';
import Tickets from './Pages/Tickets';
import BookingHistory from './Pages/BookingHistory';
import TicketDetails from './Pages/TicketDetails';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import axios from 'axios';
import { useEffect, useState } from 'react';
import checkSession from './auth/authService';
import GiveFeedback from './Pages/Feedback';
import AddComplaint from './Pages/AddComplaint';
import Artist from './Pages/Artist';

function App() {
  axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(true); // New loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  if (loading) {
    return
    // eslint-disable-next-line
    (<div id="js-preloader" className="js-preloader">
      <div className="preloader-inner">
        <span className="dot" />
        <div className="dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>)
  }
  return (
    <BrowserRouter>
      <Routes> 
        <Route path='/' element={<><Header /><Home /><Footer /></>} />
        <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path='/about' element={<><Header /><About /><Footer /></>} />
        <Route path='/all-events' element={<><Header /><ShowEvents /><Footer /></>} />
        <Route path='/shows-events' element={<><Header /><Tickets /><Footer /></>} />
        <Route path='/booking-history' element={isAuthenticated ? <><Header /><BookingHistory /><Footer /></> : <Navigate to="/" />} />
        <Route path='/give-feedback' element={isAuthenticated ? <><Header /><GiveFeedback /><Footer /></> : <Navigate to="/" />} />
        <Route path='/add-complaint' element={isAuthenticated ? <><Header /><AddComplaint /><Footer /></> : <Navigate to="/" />} />
        <Route path='/ticket-details' element={<> <Header /><TicketDetails /><Footer /></>} />
        <Route path='/artist' element={<> <Header /><Artist      /><Footer /></>} />
        <Route path='*' element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
