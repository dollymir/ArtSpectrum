import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ShowEvents() {

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
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        fetchData();
    }, []);

    return (
        <>
            <div className="page-heading-shows-events">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Tickets On Sale Now!</h2>
                            <span>Check out upcoming and past shows &amp; events and grab your ticket right now.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tickets-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="heading">
                                <h2>All Events</h2>
                            </div>
                        </div>
                        {
                            isLoaded ? (
                                <>
                                    {data?.map((event, index) => (
                                        <div className="col-lg-4" key={index}>
                                            <div className="ticket-item">
                                                <div className="thumb">
                                                <img src={`http://localhost:8000/images/eventPics/${event.eventpicture} `} alt='' width='300px' height='250px' />
                                                    <div className="price">
                                                        <span>1 ticket<br />from <em>₹ {event.pricePerSeat}</em></span>
                                                    </div>
                                                </div>
                                                <div className="down-content">
                                                    <span>There Are {event.availableSeats} Tickets Left For This Show</span>
                                                    <h4>{event.eventName}</h4>
                                                    <ul>
                                                        <li><i className="fa fa-clock-o" /> {new Date(event.datetime).toLocaleString()}</li>
                                                        <li><i className="fa fa-map-marker" />{event.address}</li>
                                                    </ul>
                                                    <div className="main-dark-button">
                                                        {
                                                            event.availableSeats === 0 ? "Sold Out!" :<Link to="/ticket-details" state={{ event: event }}>Purchase Tickets</Link>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>))}
                                </>
                            ) : (
                                <div className="js-preloader">
                                    < div className="preloader-inner">
                                        <span className="dot" />
                                        <div className="dots">
                                            <span />
                                            <span />
                                            <span />
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShowEvents;
