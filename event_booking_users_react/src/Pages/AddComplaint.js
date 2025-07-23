import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function AddComplaint() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state);

    const [formData, setFormData] = useState({
        artistId: location.state.artistId,
        bookingId: location.state.bookingId,
        eventName: location.state.eventName,
        artistName: location.state.artistName,
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/user/addComplaint",
                formData
            );

            if (response.data.success) {
                toast.success("Complaint submitted successfully!", {
                    autoClose: 1500,
                    onClose: () => navigate("/"),
                });
            }

            setFormData({
                subject: "",
                message: "",
            });
        } catch (error) {
            console.error("Error submitting feedback:", error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <div className="page-heading-about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Add Complaint</h2>
                            <span>Your complaint will help us to improve</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-item">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card p-4 shadow">
                                <form
                                    name="feedback_form"
                                    id="feedback_form"
                                    onSubmit={handleSubmit}
                                >
                                    <label>Tell us about your experience</label>
                                    <div className="mb-4">
                                        <label className="form-label" htmlFor="feedback_comments">
                                            Subject:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            name="subject"
                                            id="feedback_comments"
                                            value={formData.comments}
                                            onChange={handleChange}
                                        />
                                        <label className="form-label" htmlFor="feedback_comments">
                                            Message:
                                        </label>
                                        <textarea
                                            className="form-control"
                                            required
                                            rows={6}
                                            name="message"
                                            id="feedback_comments"
                                            value={formData.comments}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-success btn-lg">
                                        Post
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddComplaint;
