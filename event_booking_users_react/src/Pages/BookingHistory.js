import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import QRCode from "qrcode";
import {
    pdf,
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";

function BookingHistory() {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const styles = StyleSheet.create({
        page: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
                "url(https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg)",
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
        image: {
            position: "absolute",
            minWidth: "100%",
            minHeight: "100%",
            display: "block",
            height: "100%",
            width: "100%",
        },
        qrCode: {
            width: 200,
            height: 200,
            marginTop: 14.90625 * 72,
        },
    });

    const fetchBookingHistory = async () => {
        setIsLoaded(false);
        try {
            await axios
                .post("http://localhost:8000/user/getBookingHistory")
                .then((response) => response.data)
                .then((data) => {
                    setData(data.bookings.reverse());
                });
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 1500,
                onClose: () => navigate("/"),
            });
        } finally {
            setIsLoaded(true);
        }
    };
    const generateQRCode = async (eventId) => {
        try {
            return await QRCode.toDataURL(eventId);
        } catch (error) {
            console.error("Error generating QR code:", error);
            return null;
        }
    };

    const downloadTicket = async (booking) => {
        const qrCodeDataUrl = await generateQRCode(booking._id);
        if (!qrCodeDataUrl) {
            toast.error("Failed to generate QR code", { autoClose: 1500 });
            return;
        }

        const myDocument = (
            <Document>
                <Page
                    size={{
                        width: 6.90625 * 72,
                        height: 20.697916667 * 72,
                    }}
                    style={styles.page}
                >
                    <Image style={styles.image} src="assets/images/ticket-bg.png" />
                    <Text
                        style={{
                            position: "absolute",
                            top: 3.30625 * 72,
                            left: 1.0925 * 72,
                            transform: "rotate(90deg)",
                        }}
                    >
                        {new Date(
                            booking.eventDatetime
                        ).toLocaleDateString()}
                    </Text>
                    <Text
                        style={{
                            position: "absolute",
                            top: 4.30625 * 72,
                            left: 3.0925 * 72,
                            transform: "rotate(90deg)",

                        }}
                    >
                        {booking.eventName}
                    </Text>
                    <Text
                        style={{
                            position: "absolute",
                            top: 7.30625 * 72,
                            left: -0.150 * 72,
                            transform: "rotate(90deg)",
                        }}
                    >
                        UID: {
                            booking._id
                        }
                    </Text>
                    <Image style={styles.qrCode} src={qrCodeDataUrl} />
                    <View style={styles.section}>
                        <Text>AT: {
                            booking.eventAddress
                        }</Text>
                    </View>
                </Page>
            </Document>
        );

        const blob = await pdf(myDocument).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `ticket_${booking._id}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const cancelTicket = async (id) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/user/cancelTicket",
                {
                    bookingId: id,
                }
            );
            if (response.data.success) {
                toast.success(response.data.message, { autoClose: 1500 });
                fetchBookingHistory();
            } else {
                toast.error(response.data.message, { autoClose: 1500 });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, { autoClose: 1500 });
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        fetchBookingHistory();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="page-heading-rent-venue">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Booking Details</h2>
                            <span>
                                Check out our latest Shows &amp; Events and be part of us.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shows-events-schedule">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-heading">
                                <h2>Booking History</h2>
                            </div>
                        </div>
                        <div className="col-lg-12" sty>
                            <ul>
                                {isLoaded ? (
                                    <>
                                        {data?.map((event, index) => (
                                            <li key={index}>
                                                <div className="row d-flex align-items-center">
                                                    <div className="col-lg-3">
                                                        <div className="title">
                                                            <h4>{event.eventName}</h4>
                                                            <span>{event.seats} Tickets Booked</span> <br />
                                                            <span>
                                                                Total Payment: ₹ {event.totalPrice}
                                                            </span>{" "}
                                                            <br />
                                                            <span>
                                                                Status:{" "}
                                                                <span
                                                                    style={{
                                                                        color:
                                                                            event.status !== "Booked"
                                                                                ? "red"
                                                                                : "inherit",
                                                                    }}
                                                                >
                                                                    {event.status === "Booked"
                                                                        ? "Booked"
                                                                        : "Cancelled"}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="time">
                                                            <span>
                                                                <div style={{ fontWeight: "bold" }}>
                                                                    <i className="fa fa-clock-o" /> Event Time{" "}
                                                                    {new Date(
                                                                        event.eventDatetime
                                                                    ).toLocaleString()}
                                                                </div>
                                                            </span>
                                                            <span>
                                                                <i className="fa fa-clock-o" /> Booking Time{" "}
                                                                {new Date(event.date).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="place">
                                                            <span>
                                                                <i className="fa fa-map-marker" />{" "}
                                                                {event.eventAddress}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {event.status === "Booked" &&
                                                        new Date(event.eventDatetime) > new Date() ? (
                                                        <div className="col-lg-3 d-flex flex-column justify-content-center align-items-center">
                                                            <div className="main-dark-button">
                                                                <Link
                                                                    to="/add-complaint"
                                                                    state={{
                                                                        bookingId: event._id,
                                                                        artistId: event.eventArtistId,
                                                                        eventName: event.eventName,
                                                                        artistName: event.artistName
                                                                    }}
                                                                >
                                                                    Add Complaint
                                                                </Link>
                                                            </div>
                                                            <br />
                                                            <div className="main-dark-button">
                                                                <Link onClick={() => cancelTicket(event._id)}>
                                                                    Cancel Ticket
                                                                </Link>
                                                            </div>
                                                            <br />
                                                            <div className="main-dark-button">
                                                                <Link onClick={() => downloadTicket(event)}>
                                                                    Download Ticket
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="col-lg-3 d-flex flex-column justify-content-center align-items-center">
                                                                <div className="main-dark-button">
                                                                    <Link
                                                                        to="/add-complaint"
                                                                        state={{
                                                                            bookingId: event._id,
                                                                            artistId: event.eventArtistId,
                                                                            eventName: event.eventName,
                                                                            artistName: event.artistName
                                                                        }}
                                                                    >
                                                                        Add Complaint
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            {event.status === "Booked" ? (
                                                                <div className="main-dark-button">
                                                                    <div className="main-dark-button">
                                                                        <Link
                                                                            onClick={() => downloadTicket(event)}
                                                                        >
                                                                            Download Ticket
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </>
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
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingHistory;
