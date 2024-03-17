import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";
import RideShareDemoJSON from '/Users/gkubde/Documents/2023cfse003RideShare/frontend/ridesharereact/src/RideShareDemoJSON.json';
import OldRides from "./OldRides";

const Dashboard = (props) => {

    const location = useLocation();
    const { email, name } = location.state || {};

    console.log("email " + email);

    let userName = RideShareDemoJSON.demoDetails.users.find((driver) => {
        console.log('driver.email ' + driver.email);
        if (email === driver.email) {
            return driver.name;
        }
    });

    if (userName === undefined) {
        userName = {
            "name": name,
            "email": email
        }
    }

    //console.log('userName ' + JSON.stringify(userName));

    const navigate = useNavigate();
    const [userLocation, setUserLocation] = useState(null);
    const [currentLocation, setCurrentLocation] = useState("");
    const [destination, setDestination] = useState("");

    useEffect(() => {
        getUserLocation();
    }, []);

    const getUserLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setUserLocation(`Latitude: ${lat}, Longitude: ${lng}`);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    setUserLocation("Error getting user location");
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setUserLocation("Geolocation is not supported by this browser.");
        }
    };

    const showRides = () => {
        console.log('showRides ');
        navigate("/rides", {
            state: {
                "email": email,
                "name": userName.name
            }
        });
    };

    return (<div>

        <div className="mainContainerParent"></div>
        <NavBar name={userName.name} />
        <div className={"mainContainer"}>
            <div className="slds-align--absolute-center slds-p-around--x-large slds-m-around--large">
                <div className="slds-theme_default slds-container_large slds-container--center">
                    <div className="slds-p-around--x-large wrapper">

                        <div className={"titleContainer"}>Book a Ride</div>
                        <br />
                        <br />

                        <div className={"inputContainer"}>
                            <label className="slds-form-element slds-form-element__label">Current Location</label>
                            <input
                                placeholder={userLocation}
                                className={"slds-input slds-form-element"} />
                        </div>
                        <br />

                        <div className={"inputContainer"}>
                            <label className="slds-form-element slds-form-element__label">Destination</label>
                            <input
                                placeholder="Enter Destination"
                                className={"slds-input slds-form-element"} />
                        </div>
                        <br />
                        <br />

                        <div className={"inputContainer"}>
                            <input
                                className={"inputButton"}
                                type="button"
                                onClick={showRides}
                                value={"Show Rides"}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>


        <OldRides />
    </div>

    );
};

export default Dashboard;
