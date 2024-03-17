import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserData, saveUserData } from "./helper";

const Registration = (props) => {
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [role, setRole] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate();

    const onButtonClick = async () => {

        setNameError("")
        setEmailError("")
        setPasswordError("")

        if (validateFields()) {
            if (await checkUserExists(email)) {
                toast.error("User already exists");
            } else {

                let user = {
                    "name": name,
                    "email": email,
                    "role": role,
                    "password": password
                };

                saveUserData(user);

                navigate("/dashboard", {
                    state:
                    {
                        email: email,
                        name: name
                    }
                }); //Navigate to DashBoard
                toast.success("You have successfully Registered");
            }

        } else {
            toast.error("Please fill all the required fields");
        }

    }

    const validateFields = () => {
        let valid = true;

        if (name === "") {
            setNameError("Please enter correct name");
            valid = false;
        }

        if (email === "") {
            setEmailError("Please enter your email");
            valid = false;
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            valid = false;
        }

        if (password.trim() === "") {
            setPasswordError("Please enter a password");
            valid = false;
        } else if (password.length < 7) {
            setPasswordError("Password entry does not meet criteria. Minimum 8 charachters required");
            valid = false;
        }

        return valid;
    };

    return <div>
        <div className="mainContainerParent"></div>
        <div className="slds-align--absolute-center slds-p-around--x-large slds-m-around--large">
            <div className="slds-theme_default slds-container_large slds-container--center">
                <div className="slds-p-around--x-large wrapper">


                    {/* Main Heading */}
                    <div className={"titleContainer"}>
                        <div>Rideshare Registration</div>
                    </div>
                    <br />

                    {/* Name */}
                    <div className={"inputContainer"}>
                        <label className="slds-form-element slds-form-element__label">Name</label>
                        <input
                            value={name}
                            placeholder="Enter your Name here"
                            onChange={ev => setName(ev.target.value)}
                            className="slds-input slds-form-element" />
                        <label className="errorLabel">{nameError}</label>
                    </div>
                    <br />

                    {/* Email */}
                    <div className={"inputContainer"}>
                        <label className="slds-form-element slds-form-element__label">Email</label>
                        <input
                            value={email}
                            placeholder="Enter your Email here"
                            onChange={ev => setEmail(ev.target.value)}
                            className="slds-input slds-form-element" />
                        <label className="errorLabel">{emailError}</label>
                    </div>
                    <br />

                    {/* Role */}
                    <div className={"inputContainer"}>
                        <label className="slds-form-element slds-form-element__label">Role</label>
                        <select className="slds-input slds-form-element"
                            value={role}
                            onChange={ev => setRole(ev.target.value)}>
                            <option value="Driver">Driver</option>
                            <option value="Customer">Passenger</option>
                        </select>
                    </div>
                    <br />

                    {/* Password */}
                    <div className={"inputContainer"}>
                        <label className="slds-form-element slds-form-element__label">Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your Password here"
                            onChange={ev => setPassword(ev.target.value)}
                            className="slds-input slds-form-element" />
                        <label className="errorLabel">{passwordError}</label>
                    </div>
                    <br />
                    <br />

                    {/* Register Button */}
                    <div className="slds-align--absolute-center">
                        <div className={"inputContainer"}>
                            <input
                                className={"inputButton"}
                                type="button"
                                onClick={onButtonClick}
                                value={"Register"} />
                        </div>
                        <br />
                        <div>
                            <a href="/login">Click here to Login Instead</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

}

async function checkUserExists(email) {
    let userData = await getUserData();
    console.log('testData ' + JSON.stringify(userData));
    console.log('testData ', userData);

    return userData.find(driver => {
        console.log("driver.email " + driver.email);
        return email === driver.email;
    });
}

export default Registration;