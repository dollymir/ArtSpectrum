import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function GiveFeedback() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        rating: "",
        review: "",
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
                "http://localhost:8000/user/addFeedback",
                {
                    review: formData.review,
                    rating: formData.rating,
                }
            );

            if (response.data.success) {
                toast.success("Feedback submitted successfully!", {
                    autoClose: 1500,
                    onClose: () => navigate("/"),
                });
            }

            setFormData({
                rating: "",
                review: "",
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
                            <h2>Feedback</h2>
                            <span>Your satisfaction is our top priority</span>
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
                                    <label>How do you rate your overall experience?</label>
                                    <div className="mb-3">
    <label htmlFor="rating_range" className="form-label">Rate (1-5):</label>
    <div className="d-flex ">
        
    <div className="ml-2"><mark>{formData.rating} Stars</mark></div>
        <input
            type="range"
            className="form-range"
            id="rating_range"
            name="rating"
            min="1"
            max="5"
            step="1"
            value={formData.rating}
            onChange={handleChange}
            style={{ background: `linear-gradient(to right, green ${(formData.rating - 1) * 25}%, transparent 0%) `}}
            />
    </div>
</div>
                                    <div className="mb-4">
                                        <label className="form-label" htmlFor="feedback_review">
                                            review:
                                        </label>
                                        <textarea
                                            className="form-control"
                                            required
                                            rows={6}
                                            name="review"
                                            id="feedback_review"
                                            value={formData.review}
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

export default GiveFeedback;
