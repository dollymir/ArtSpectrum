import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Tickets() {
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
                            <h2>Our Shows &amp; Events</h2>
                            <span>Check out upcoming and past shows &amp; events.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shows-events-tabs">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row" id="tabs">
                                <div className="col-lg-12">
                                    <section className="tabs-content">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="heading">
                                                    <h2>Upcoming Events</h2>
                                                </div>
                                            </div>
                                            {isLoaded ? (
                                                <div className="row">
                                                    {data?.map((event, index) => (
                                                        <div className="col-lg-12" key={index}>
                                                            <div className="event-item">
                                                                <div className="row">
                                                                    <div className="col-lg-4">
                                                                        <div className="left-content">
                                                                            <h4>{event.eventName}</h4>
                                                                            <p>{event.category}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="thumb">
                                                                            <img
                                                                                src="assets/images/event-page-01.jpg"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right-content">
                                                                            <ul>
                                                                                <li>
                                                                                    <i className="fa fa-clock-o" />
                                                                                    <h6>
                                                                                        {new Date(
                                                                                            event.datetime
                                                                                        ).toLocaleString()}
                                                                                    </h6>
                                                                                </li>
                                                                                <li>
                                                                                    <i className="fa fa-map-marker" />
                                                                                    <span>{event.address}</span>
                                                                                </li>
                                                                                <li>
                                                                                    <i className="fa fa-users" />
                                                                                    <span>
                                                                                        {event.availableSeats} Seats
                                                                                        Available
                                                                                    </span>
                                                                                </li>
                                                                                <li>
                                                                                    <div
                                                                                        className="main-grey-button"
                                                                                        style={{ color: "white" }}
                                                                                    >
                                                                                        <Link
                                                                                            to="/ticket-details"
                                                                                            state={{ event: event }}
                                                                                        >
                                                                                            Book Now
                                                                                        </Link>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="js-preloader">
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
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tickets;
