import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import checkSession from "../auth/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardReactFormContainer from "card-react";

function TicketDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // eslint-disable-next-line
    const [isCardNumberValid, setIsCardNumberValid] = useState(true);

    const [ticketsData, setTicketsData] = useState({
        eventId: location.state.event._id,
        artistName: location.state.event.artistName,
        seats: 1,
    });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        const checkLoginStatus = async () => {
            const loggedIn = await checkSession();
            setIsLoggedIn(loggedIn);
        };

        checkLoginStatus();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTicketsData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            toast.warn("Login to book tickets!", {
                autoClose: 1500,
                onClose: () => navigate("/login"),
            });
            return;
        }

        // Check if the #card-wrapper element exists and contains the jp-card-identified class
        const cardWrapper = document.getElementById("card-wrapper");
        const nestedDiv = cardWrapper.querySelector(".jp-card-identified");
        if (nestedDiv) {
            // The jp-card-identified class is present
            try {
                const response = await axios.post(
                    "http://localhost:8000/user/bookEvent",
                    ticketsData
                );

                const { success } = response.data;
                if (success) {
                    toast.success("Ticket booked successfully!", {
                        autoClose: 1500,
                        onClose: () => navigate("/"),
                    });
                }
            } catch (error) {
                console.log("BookTicket Err: ", error);
                if (error.response) {
                    toast.error(error.response.data.error, { autoClose: 1500 });
                }
            }
        } else {
            // The jp-card-identified class is not present
            toast.error("Please provide valid card details.", { autoClose: 1500 });
        }
    };

    return (
        <>
            <ToastContainer stacked />
            <div className="page-heading-shows-events">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Tickets On Sale Now!</h2>
                            <span>
                                Check out upcoming and past shows &amp; events and grab your
                                ticket right now.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ticket-details-page">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="left-image">
                                    <CardReactFormContainer container="card-wrapper">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-6 offset-md-3">
                                                    <div className="form-group">
                                                        <label htmlFor="number">Card number</label>

                                                        <input
                                                            className={`form-control ${!isCardNumberValid ? "is-invalid" : ""
                  
                                                        }`}
                                                            id="number"
                                                            placeholder="Card number"
                                                            type="text"
                                                            valid
                                                            name="number"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="name">Full name</label>
                                                        <input
                                                            className="form-control"
                                                            id="name"
                                                            placeholder="Full name"
                                                            type="text"
                                                            name="name"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="expiry">MM/YYYY</label>
                                                        <input
                                                            className="form-control"
                                                            id="expiry"
                                                            placeholder="MM/YYYY"
                                                            type="text"
                                                            name="expiry"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="cvc">CVC</label>
                                                        <input
                                                            className="form-control"
                                                            id="cvc"
                                                            placeholder="CVC"
                                                            type="text"
                                                            name="cvc"
                                                            maxLength={3}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="card-wrapper"></div>
                                    </CardReactFormContainer>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="right-content">
                                    <h4>{location.state.event.eventName}</h4>
                                    <span>
                                        {location.state.event.availableSeats} Tickets still
                                        available
                                    </span>
                                    <ul>
                                        <li>
                                            <i className="fa fa-clock-o" />{" "}
                                            {new Date(location.state.event.datetime).toLocaleString()}
                                        </li>
                                        <li>
                                            <i className="fa fa-map-marker" />
                                            {location.state.event.address}
                                        </li>
                                    </ul>
                                    <div className="quantity-content">
                                        <div className="left-content">
                                            <h6>Standard Ticket</h6>
                                            <p>₹ {location.state.event.pricePerSeat} per ticket</p>
                                        </div>
                                        <div className="right-content">
                                            <div className="quantity buttons_added">
                                                <input
                                                    type="button"
                                                    defaultValue="-"
                                                    className="minus"
                                                    onClick={() => {
                                                        const newValue = Math.max(
                                                            1,
                                                            Number(ticketsData.seats) - 1
                                                        );
                                                        setTicketsData((prevData) => ({
                                                            ...prevData,
                                                            seats: newValue,
                                                        }));
                                                    }}
                                                />
                                                <input
                                                    type="number"
                                                    step={1}
                                                    min={1}
                                                    max={10}
                                                    name="seats"
                                                    defaultValue={ticketsData.seats}
                                                    onChange={handleChange}
                                                    onKeyDown={(e) => e.preventDefault()}
                                                    className="input-text qty text"
                                                />
                                                <input
                                                    type="button"
                                                    defaultValue="+"
                                                    className="plus"
                                                    onClick={() => {
                                                        const newValue = Math.min(
                                                            10,
                                                            Number(ticketsData.seats) + 1
                                                        );
                                                        setTicketsData((prevData) => ({
                                                            ...prevData,
                                                            seats: newValue,
                                                        }));
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="total">
                                        <h4>
                                            Total: ₹{" "}
                                            {ticketsData.seats * location.state.event.pricePerSeat}
                                        </h4>
                                        <div className="main-dark-button">
                                            <button type="submit">Purchase Tickets</button>
                                        </div>
                                    </div>
                                    <div className="warn">
                                        <p>*You Can Only Buy 10 Tickets For This Show</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

           
        </>
    );
}

export default TicketDetails;
