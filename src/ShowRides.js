import React, { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";


import car from "/Users/gkubde/Documents/2023cfse003RideShare/frontend/ridesharereact/src/images/car.jpeg";
import motorcycle from "/Users/gkubde/Documents/2023cfse003RideShare/frontend/ridesharereact/src/images/motorcycle.jpeg";
import truck from "/Users/gkubde/Documents/2023cfse003RideShare/frontend/ridesharereact/src/images/truck.jpeg";
import bicycle from "/Users/gkubde/Documents/2023cfse003RideShare/frontend/ridesharereact/src/images/bicycle.png";
import bus from "/Users/gkubde/Documents/2023cfse003RideShare/frontend/ridesharereact/src/images/bus.jpeg";

const vehicles = [
    {
        "type": "car",
        "name": "Toyota Camry",
        "imageurl": car,
        "charges": "100",
        "eta": "10"
    },
    {
        "type": "motorcycle",
        "name": "Harley-Davidson",
        "imageurl": motorcycle,
        "charges": "200",
        "eta": "20"
    },
    {
        "type": "truck",
        "name": "Ford F-150",
        "imageurl": truck,
        "charges": "300",
        "eta": "30"
    },
    {
        "type": "bicycle",
        "name": "Trek 520",
        "imageurl": bicycle,
        "charges": "400",
        "eta": "40"
    },
    {
        "type": "bus",
        "name": "Mercedes Citaro",
        "imageurl": bus,
        "charges": "500",
        "eta": "50"
    }
];




const Rides = () => {

    const location = useLocation();
    const { email, name } = location.state || {};

    const navigate = useNavigate();

    const bookARide = () => {
        console.log(selectedRide);

        if (selectedRide.type) {
            navigate("/ongoingride", {
                state: {
                    "type": selectedRide.type,
                    "fare": selectedRide.fare,
                    "email": email,
                    "name": name
                }
            });
        } else {
            toast.error("Please select ride");
        }
    }

    const selectedRide = {};

    const vehicleSelected = (event) => {
        //event.stopPropagation();
        console.log(event.currentTarget.dataset.type);
        console.log(event.currentTarget.dataset.charges);

        selectedRide['type'] = event.currentTarget.dataset.type;
        selectedRide['fare'] = event.currentTarget.dataset.charges;

        console.log(selectedRide);

    }

    return <div>

        <div className="mainContainerParent"></div>
        <NavBar name={name} />
        <div className="slds-align--absolute-center slds-p-around--x-large slds-m-around--large">
            <div className="slds-theme_default slds-container_large slds-container--center">
                <div className="slds-p-around--x-large wrapper">
                    <div className={"titleContainer"}>Select Ride</div>
                    <br />
                    <br />
                    <div className="slds-grid slds-grid--vertical">
                        {vehicles.map((vehicle) =>
                            <div className="slds-col slds-grid slds-grid--align-space slds-grid--vertical-align-center slds-box slds-theme--shade wrapper" tabIndex="0" key={vehicle.type} data-type={vehicle.type} data-charges={vehicle.charges} onClick={vehicleSelected}>
                                <div className="slds-col slds-size--1-of-5 slds-p-around--small">
                                    <img src={vehicle.imageurl} alt={vehicle.name} className="slds-icon--large"></img>
                                </div>
                                <div className="slds-col slds-size--1-of-5 slds-p-around--small"><p className="slds-input slds-size_full">{vehicle.type}</p></div>
                                <div className="slds-col slds-size--1-of-5 slds-p-around--small"><p className="slds-input slds-size_full">{vehicle.name}</p></div>
                                <div className="slds-col slds-size--1-of-5 slds-p-around--small"><p className="slds-input slds-size_full">{vehicle.charges} Rupees</p></div>
                                <div className="slds-col slds-size--1-of-5 slds-p-around--small"><p className="slds-input slds-size_full">{vehicle.eta} Minutes</p></div>
                            </div>
                        )}
                    </div>

                    <br />
                    <br />

                    <div className={"inputContainer"}>
                        <input
                            className={"inputButton"}
                            type="button"
                            value={"Book Ride"}
                            onClick={bookARide} />
                    </div>

                </div>

            </div>
        </div>
    </div>

}



export default Rides;