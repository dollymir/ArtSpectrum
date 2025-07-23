
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import checkSession from "../auth/authService";

function Footer() {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState("Home");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/logout");
            toast.success("Logout Successful", {
                autoClose: 1000,
                onClose: () => window.location.reload(),
                position: "top-left",
            });
        } catch (error) {
            console.log("Logout Err: ", error);
            toast.error(error.response.data.message, {
                autoClose: 1500,
                onClose: () => window.location.reload(),
                position: "top-left",
            });
        }
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn = await checkSession();
            setIsLoggedIn(loggedIn);
            console.log(loggedIn);
        };

        checkLoginStatus();
        

        switch (location.pathname) {
            case "/":
                setActiveItem("Home");
                break;
            case "/about":
                setActiveItem("About Us");
                break;
            case "/artist":
                setActiveItem("Artist");
                break;
            // case "/shows-events":
            //     setActiveItem("Shows & Events");
            //     break;
            case "/booking-history":
                setActiveItem("Booing History");
                break;
            case "/give-feedback":
                setActiveItem("Give Feedback");
                break;
            case "/all-events":
                setActiveItem("All Events");
                break;
            case "/login":
                setActiveItem("Login");
                break;
            default:
                setActiveItem("Home");
                break;
        }

        
    }, [location]);


   
    return (
        <>
            {/* *** Footer *** */}
            <footer>

                <div className="container">
                    <hr className='my-4' style={{ height: 2, borderWidth: 0, color: 'gray', backgroundColor: 'gray' }} />

                    <ToastContainer />
            <header className="header-area header-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                {/* ***** Logo Start ***** */}
                                <Link to="/" className="logo">
                                    Art<em>Spectrum</em>
                                   
                                </Link>
                                
                                {/* ***** Logo End ***** */}
                                {/* ***** Menu Start ***** */}
                                <ul className="nav">
                                    <li>
                                        <Link
                                            to="/"
                                            className={activeItem === "Home" ? "active" : ""}
                                            onClick={(e) => {
                                                handleItemClick("Home");
                                            }}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link
                                            to="/shows-events"
                                            className={
                                                activeItem === "Shows & Events" ? "active" : ""
                                            }
                                            onClick={(e) => {
                                                handleItemClick("Shows & Events");
                                            }}
                                        >
                                            Shows &amp; Events
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link
                                            to="/all-events"
                                            className={activeItem === "All Events" ? "active" : ""}
                                            onClick={(e) => {
                                                handleItemClick("All Events");
                                            }}
                                        >
                                            All Events
                                        </Link>
                                    </li>

                                    {isLoggedIn === true ? (
                                        <>
                                            <li>
                                                <Link
                                                    to="/booking-history"
                                                    className={
                                                        activeItem === "Booing History" ? "active" : ""
                                                    }
                                                    onClick={(e) => {
                                                        handleItemClick("Booing History");
                                                    }}
                                                >
                                                    Booking History
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/give-feedback"
                                                    className={
                                                        activeItem === "Give Feedback" ? "active" : ""
                                                    }
                                                    onClick={(e) => {
                                                        handleItemClick("Give Feedback");
                                                    }}
                                                >
                                                    Give Feedback
                                                </Link>
                                            </li>
                                            
                                    <li>
                                        <Link
                                            to="/about"
                                            className={activeItem === "About Us" ? "active" : ""}
                                            onClick={(e) => {
                                                handleItemClick("About Us");
                                            }}
                                        >
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/artist"
                                            className={activeItem === "Artist" ? "active" : ""}
                                            onClick={(e) => {
                                                handleItemClick("Artist");
                                            }}
                                        >
                                            Artist
                                        </Link>
                                    </li>
                                        </>
                                    ) : null}

                                    <li>
                                        {isLoggedIn === false ? (
                                            <Link
                                                to="/login"
                                                className={activeItem === "Login" ? "active" : ""}
                                                onClick={(e) => {
                                                    handleItemClick("Login");
                                                }}
                                            >
                                                Login
                                            </Link>
                                        ) : (
                                            <Link
                                                className={activeItem === "Login" ? "active" : ""}
                                                onClick={(e) => handleLogout(e)}
                                            >
                                                Log Out
                                            </Link>
                                        )}
                                    </li>
                                </ul>
                                <a href="/#" className="menu-trigger">
                                    <span>Menu</span>
                                </a>
                                {/* ***** Menu End ***** */}
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

                    {/* <div className="row">
                        <div className="col-lg-4">
                            <div className="address">
                                <h4>Sunny Hill Festival Address</h4>
                                <span>5 College St NW, <br />Norcross, GA 30071<br />United States</span>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><a href="/#">Info</a></li>
                                    <li><a href="/#">Venues</a></li>
                                    <li><a href="/#">Guides</a></li>
                                    <li><a href="/#">Videos</a></li>
                                    <li><a href="/#">Outreach</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="hours">
                                <h4>Open Hours</h4>
                                <ul>
                                    <li>Mon to Fri: 10:00 AM to 8:00 PM</li>
                                    <li>Sat - Sun: 11:00 AM to 4:00 PM</li>
                                    <li>Holidays: Closed</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="under-footer">
                                <div className="row">
                                    <div className="col-lg-6 col-sm-6">
                                        <p>São Conrado, Rio de Janeiro</p>
                                    </div>
                                    <div className="col-lg-6 col-sm-6">
                                        <p className="copyright">Copyright 2021 ArtXibition Company
                                            <br />Design: <a rel="nofollow" href="https://www.tooplate.com" target="_parent">Tooplate</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>*/}
                </div>
            </footer>
        </>
    )
}

export default Footer