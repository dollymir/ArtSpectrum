import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/admin/getUpcomingEvents"
            );
            setData(response.data.upcomingEvents);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoaded(true);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0, { behavior: "smooth" });
        fetchData();
    }, []);

    return (
        <>
            <div className="main-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="main-content">
                                {/* <h6>Opening on Thursday, March 31st</h6> */}
                                <h2>ArtSpectrum</h2>
                                <h4 style={{ color: 'white' }}>A Stage to fly</h4>
                                {/* <div className="main-white-button">
                                    <Link to="/ticket-details">Purchase Tickets</Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isLoaded ? (
                <div className="venue-tickets">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-heading">
                                    <h2>Events &amp; Tickets</h2>
                                </div>
                            </div>
                            <div className="container col-lg-11">
    <style>
        {`
        .marquee-container {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            background: #f0f0f0; /* Background color */
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Box shadow for depth */
            padding: 10px; /* Optional padding for spacing */
            margin-bottom:50px;
        }

        .marquee img {
            height: 350px;
            width: 300px;
            border-radius: 10px;
            margin: 10px;
            display: inline-block;
            animation: marqueeAnimation 20s linear infinite alternate;
        }

        @keyframes marqueeAnimation {
            0% {
                transform: translateX(100%);
            }
            100% {
                transform: translateX(-100%);
            }
        }
        `}
    </style>
    <div className="marquee-container">
        <marquee className="marquee">
            <img src={require('../assets/slideshow/drama.jpeg')} className="maq-image" alt="Drama" />
            <img src={require('../assets/slideshow/sing.jpeg')} className="maq-image" alt="Sing" />
            <img src={require('../assets/slideshow/puppet.jpeg')} className="maq-image" alt="Puppet" />
            <img src={require('../assets/slideshow/dance.jpeg')} className="maq-image" alt="Dance" />
            <img src={require('../assets/slideshow/sing2.jpeg')} className="maq-image" alt="Sing 2" />
            <img src={require('../assets/slideshow/dance2.jpeg')} className="maq-image" alt="Dance 2" />
            <img src={require('../assets/slideshow/puppet2.jpeg')} className="maq-image" alt="Puppet 2" />
            <img src={require('../assets/slideshow/drama2.jpeg')} className="maq-image" alt="Drama 2" />
        </marquee>
    </div>
</div>

                            {data?.slice(0, 3)?.map((event, index) => (
                                <div className="col-lg-4" key={index}>
                                    <div className="venue-item">
                                        <div className="thumb">
                                                    <img src={`http://localhost:8000/images/eventPics/${event.eventpicture} `} alt='' width='300px' height='400px' />
                                        </div>
                                        <div className="down-content">
                                            <div className="left-content">
                                                <div className="main-white-button">
                                                    {
                                                        event.availableSeats === 0 ? 
                                                            "Sold Out!"
                                                         : <Link to="ticket-details" state={{ event: event }}>
                                                        Purchase Tickets
                                                    </Link>
                                                    }
                                                </div>
                                            </div>
                                            <div className="right-content">
                                                <h4>{event.eventName}</h4>
                                                <br />
                                                <ul>
                                                    <li>
                                                        <i className="fa fa-clock-o" />{" "}
                                                        {new Date(event.datetime).toLocaleString()}
                                                    </li>
                                                    <br />
                                                    <li>
                                                        <i className="fa fa-map-marker" />
                                                        {event.address}
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li title="Available Seats">
                                                        <i className="fa fa-sitemap" />
                                                        {event.availableSeats}
                                                    </li>
                                                    <li title="Total Seats">
                                                        <i className="fa fa-user" />
                                                        {event.totalSeats}
                                                    </li>
                                                </ul>
                                                <div className="price">
                                                    <span>
                                                        1 ticket
                                                        <br />
                                                        for <em>₹ {event.pricePerSeat}</em>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {data.length > 3 ? (
                            <div className="main-grey-button">
                                <Link to="/all-events">More Events</Link>
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : (
                <div className="js-preloader ">
                    <div className="preloader-inner">
                        <span className="dot" />
                        <div className="dots">
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;