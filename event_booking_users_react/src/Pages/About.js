import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./about.css";

function About() {
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
        <div className="about-container">
        <section className="about-section intro-section">
            <div className="container">
                <h2 className="section-title">Welcome To Our Artspectrum</h2>
                <p className="intro-text">
                Art is like a big rainbow with many colors, each representing a different kind of art. First, there's painting and drawing. Artists use brushes and pencils to create beautiful pictures that tell stories without words. Then, there's music. It's like a language made of sounds instead of words. Different kinds of music can make you feel happy, sad, or excited. Next, there are books and stories. Writers use words to create imaginary worlds and characters that you can imagine in your mind. After that, there's acting and dancing. Actors pretend to be different people on stage, while dancers use their bodies to tell stories through movement. Lastly, there's art mixed with technology. This is when artists use computers and gadgets to make cool and interactive things, like virtual reality games or digital art. Each type of art is special and helps us express ourselves in different ways. Whether it's through colors, sounds, words, movement, or technology, art is a way for us to share our feelings and ideas with the world.
                    </p>
                {/* Add header banner image */}
            </div>
        </section>
        <section className="about-section event-showcase">
            <div className="container">
                <h2 className="section-title">Event Showcase</h2>
                <div className="event-images">
                    {/* Add images showcasing past events */}
                    <img src={require('./extra/puppet.jpg')} alt="Event 1" />
                    <img src={require('./extra/paint.jpg')} alt="Event 2" />
                    <img src={require('./extra/dance.jpg')} alt="Event 3" />
                </div>
            </div>
        </section>

        <section className="about-section key-feature-section">
            <div className="container">
                <h2 className="section-title">Key Features</h2>
                <ul className="feature-list">
                <li><span>Providing a Platform</span> - We provide a platform to local artists to showcase their talent</li>
                        <li><span>Categorized Artists</span> - Easily find a specific type of artist when you need it</li>
                        <li><span>Convenient Payment</span> - Pay for your shows using various methods such as credit card, master card, and RuPay</li>
                        <li><span>Cancellation Flexibility</span> - Cancel your booking and get a refund with our user-friendly cancellation policy</li>
                    </ul>
            </div>
        </section>

        <section className="about-section mission-section">
            <div className="container">
                <h2 className="section-title">Our Mission</h2>
                <p className="mission-text">
                Welcome to Artspectrum, where the vibrant tapestry of local artistry finds its spotlight. Born from a passion for nurturing the hidden gems within our community, we provide a stage for budding artists to unveil their talents to the world. From the soulful melodies of street musicians to the mesmerizing strokes of emerging painters, every artist has a story waiting to be told. Our platform serves as a beacon, illuminating the pathways for these creators, bridging the gap between their aspirations and the audience eager to embrace their craft. Whether you're an artist seeking recognition or an art enthusiast craving inspiration, join us in celebrating the richness and diversity of our local artistic landscape. Together, let's cultivate a culture where every voice, every brushstroke, and every performance is cherished and celebrated. Welcome to a realm where art knows no boundaries – welcome to Artspectrum.
                    </p>
            </div>
        </section>

        <section className="about-section story-section">
            <div className="container">
                <h2 className="section-title">Why Choose Us</h2>
                <p className="story-text">
                Our Artspectrum System Providing a platform to local artists to show their talent Because local artists do not get that much support, we are providing the solution for this. In this website different types of artists are available reliable price and comfort zone, where you can enjoy the show from home very comfortably support a local artist for their bright future.
                    </p>
            </div>
        </section>

        {/* Add event showcase section with images */}
       

        {/* Add team section with team member photos */}
        <section className="about-section team-section">
            <div className="container">
                <h2 className="section-title">Our Team</h2>
                <div className="team-members">
                    <div className="team-member">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuVe0BtiOCkvJYEqNLt3i4cF14ajEAV6Ub5Q&s" alt="Team Member 1" />
                        <p>Harsh Prajapati</p>
                    </div>
                    <div className="team-member">
                        <img src="logo2.png" alt="Team Member 2" />
                        <p>Jane Smith</p>
                    </div>
                    <div className="team-member">
                        <img src="logo2.png" alt="Team Member 2" />
                        <p>Jane Smith</p>
                    </div>
                    {/* Add more team members */}
                </div>
            </div>
        </section>

        {/* Add call to action section with image */}
        

            {isLoaded ? (
                <div className="venue-tickets">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-heading">
                                    <h2>Events &amp; Tickets</h2>
                                </div>
                            </div>
                            {data?.slice(0, 3)?.map((event, index) => (
                                <div className="col-lg-4" key={index}>
                                    <div className="ticket-item">
                                        <div className="thumb">
                                            <Link to="/ticket-details" state={{event:event}}>
                                                <img src={`http://localhost:8000/images/eventPics/${event.eventpicture} `} alt='' width='300px' height='250px' />
                                            </Link>
                                        </div>
                                        <div className="down-content">
                                            <span>There Are {event.availableSeats} Tickets Left For This Show</span>
                                            <h4>{event.eventName}</h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <br></br><br></br>
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
        </div>
    );
}

export default About;