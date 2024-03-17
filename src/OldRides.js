import React, { useState, useEffect } from 'react';
import johnwick from "/Users/gkubde/Documents/2023cfse003RideShare/frontend/ridesharereact/src/images/JohnWick.png";
import { getFeedbacks } from './helper';

const OldRides = (props) => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const data = await getFeedbacks();
            setFeedbacks(data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    return (
        <div className="slds-theme_default slds-container--center">
            <div className={"titleContainer"}>Old Rides</div>
            <div className="slds-p-around--large slds-m-around--small">
                {feedbacks.map((ride, index) => (
                    <div key={index} tabIndex="0" className="slds-grid slds-grid--align-space slds-grid--align-spread slds-wrap slds-box wrapper slds-grid--vertical-align-center">
                        <div className="slds-col">
                            <img width="100" src={johnwick} className=" slds-button--icon-more" alt="ride image" />
                        </div>
                        <div className="slds-col slds-button slds-button--icon-more">
                            <p className="RideContent">Driver - {ride.email}</p>
                        </div>
                        <div className="slds-col slds-align--absolute-center">
                            <div className="rate-box">
                                {generateStars(ride.star)}
                            </div>
                        </div>
                        <div className="slds-col slds-align--absolute-center">
                            <label>Feedback - </label>
                            <input
                                placeholder={ride.comment}
                                className="slds-input slds-form-element"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function generateStars(star) {
    const stars = [];
    for (let i = 0; i < star; i++) {
        stars.push(
            <label key={i} className="starGlow" >★</label>
        );
    }
    return stars;
}

export default OldRides;
