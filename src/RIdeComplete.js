import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import { saveFeedBack } from "./helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RideComplete = () => {
    const [star, setStar] = useState(0); // State to track the selected star rating
    const [comment, setComment] = useState(""); // State to track the comment

    const location = useLocation();
    const { type, fare, email, name } = location.state || {};

    const navigate = useNavigate();

    // Function to handle the selection of the star rating
    const handleStarSelection = (selectedStar) => {
        console.log(selectedStar);
        setStar(selectedStar);
    };

    // Function to submit the feedback
    const submitFeedback = () => {

        if (star !== undefined && star !== "" && comment !== undefined && comment !== "") {
            const feedback = {
                "star": star,
                "email": email,
                "comment": comment
            };
            saveFeedBack(feedback);

            navigate("/dashboard", {
                state: {
                    "type": type,
                    "fare": fare,
                    "email": email,
                    "name": name
                }
            });

        } else {
            toast.error("Please Provide Feedback");
        }
    };

    return (
        <div className="mainContainerParent">
            <NavBar />
            <div className="slds-align--absolute-center slds-p-around--x-large slds-m-around--large">
                <div className="slds-theme_default slds-container_large slds-container--center">
                    <div className="slds-p-around--x-large wrapper slds-grid slds-grid--vertical slds-grid--vertical-align-center">
                        <div className="titleContainer">
                            Ride Complete
                        </div>
                        <br />
                        <div className="title">Rate your experience</div>
                        <br />
                        <div className="content">We highly value your feedback! Kindly take a moment to rate your experience and provide us with your valuable feedback.</div>
                        <div className="rate-box">
                            {[...Array(5)].map((_, index) => (
                                <React.Fragment key={index}>
                                    <input type="radio" name="star" id={`star${index}`} value={5 - index} style={{ display: "none" }} onChange={() => handleStarSelection(5 - index)} />
                                    <label className="star" htmlFor={`star${index}`}></label>
                                </React.Fragment>
                            ))}
                        </div>
                        <br />
                        <div className="inputContainer">
                            <textarea cols="30" rows="6" placeholder="Tell us about your experience!" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        </div>
                        <br />
                        <div className={"inputContainer"}>
                            <input className={"inputButton"} type="button" onClick={submitFeedback} value={"Submit Feedback"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RideComplete;
