import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loading from "/Users/gkubde/Documents/2023cfse003RideShare/frontend/ridesharereact/src/images/loading.png";
import johnwick from "/Users/gkubde/Documents/2023cfse003RideShare/frontend/ridesharereact/src/images/JohnWick.png";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";


const OnGoingRide = (props) => {

    const location = useLocation();
    const { type, fare, email, name } = location.state || {};

    console.log("type " + type);
    console.log("fare " + fare);


    const [showFirstDiv, setShowFirstDiv] = useState(true);
    const [eta, setEta] = useState(60); // Initial ETA value in seconds
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFirstDiv(false);
        }, 5000); // Show the first div for 5 seconds
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!showFirstDiv) {
            const interval = setInterval(() => {
                setEta(prevEta => prevEta - 1);
            }, 1000); // Update ETA every second
            return () => clearInterval(interval);
        }
    }, [showFirstDiv]);

    const cancelRide = () => {
        const confirmation = window.confirm("Are you sure you want to cancel the ride?");
        if (confirmation) {
            // Handle cancellation
            navigate("/dashboard", {
                state: {
                    "type": type,
                    "fare": fare,
                    "email": email,
                    "name": name
                }
            });
            console.log("Ride cancelled");
        } else {
            // User clicked "No" or closed the dialog
            console.log("Ride not cancelled");
        }
    }

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    }

    const completeRide = () => {
        navigate("/ridecomplete", {
            state: {
                "type": type,
                "fare": fare,
                "email": email,
                "name": name
            }
        })
    }
    return (
        <div>
            <div className="mainContainerParent"></div>
            <NavBar name={name} />
            <div className="slds-align--absolute-center slds-p-around--x-large slds-m-around--large">
                {showFirstDiv && <>
                    <div className="slds-theme_default slds-container_large slds-container--center">
                        <div className="slds-p-around--x-large wrapper">
                            <div className={"titleContainer"}>
                                <div>Searching for a Ride</div>
                            </div>
                            <br />
                            <div className="loading-animation">
                                <img height="50" src={loading}></img>
                            </div>
                            <br />
                            <div className={"inputContainer"}>
                                <input
                                    className={"inputButton"}
                                    type="button"
                                    onClick={cancelRide}
                                    value={"Cancel Request"} />
                            </div>
                            <br />
                        </div>
                    </div>
                </>}
                {!showFirstDiv && <>
                    <div className="slds-theme_default slds-container_large slds-container--center">

                        <div className="slds-p-around--x-large wrapper">

                            <div className={"titleContainer"}>
                                <div>OnGoing Ride</div>
                            </div>
                            <br />
                            <div className="RideDetails">
                                <div className="image-container">
                                    <img height="100" src={johnwick} className="profile-image slds-icon" alt="Profile Image" ></img>
                                </div>
                                <div className="slds-button slds-button--icon-more slds-size_full">
                                    Mr. John Wick
                                </div>
                                <div className="slds-button slds-button--icon-more slds-size_full">
                                    Vehicle - {type}
                                </div>
                                <div className="slds-button slds-button--icon-more slds-size_full">
                                    ETA - {formatTime(eta)}
                                </div>
                                <div className="slds-button slds-button--icon-more slds-size_full">
                                    Fare - {fare}
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div className={"inputContainer"}>
                                <input
                                    className={"inputButton"}
                                    type="button"
                                    onClick={completeRide}
                                    value={"Complete Ride"} />
                            </div>
                            <br />
                        </div>
                    </div>
                </>}
            </div>
        </div>
    );
};

export default OnGoingRide;
