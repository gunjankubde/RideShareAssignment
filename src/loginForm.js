import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css';
import { getUserData, saveUserData } from "./helper";


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const onClickLogin = async () => {
        setEmailError("");
        setPasswordError("");

        if (email === "" || password === "") {
            if (email === "") setEmailError("Please provide email");
            if (password === "") setPasswordError("Please provide password");
            toast.error("Login Details cannot be empty");
        } else {
            const userExists = checkUserExists(email, password);

            if (userExists) {
                navigate("/dashboard", { state: { email: email } });
                toast.success("Login Successful");
            } else {
                toast.error("Check login details");
            }
        }
    };

    return (
        <div>
            <div className="mainContainerParent"></div>
            <div className="slds-align--absolute-center slds-p-around--x-large slds-m-around--large">
                <div className="slds-theme_default slds-container_large slds-container--center">
                    <div className="slds-p-around--x-large wrapper">

                        <div className={"titleContainer"}>
                            <div>Rideshare Login</div>
                        </div>
                        <br />
                        <div className={"inputContainer"}>
                            <input
                                value={email}
                                placeholder="Enter your Email here"
                                onChange={ev => setEmail(ev.target.value)}
                                className="slds-input slds-form-element"
                            />
                            <label className="errorLabel">{emailError}</label>
                        </div>
                        <br />
                        <div className={"inputContainer"}>
                            <input
                                value={password}
                                placeholder="Enter your Password here"
                                onChange={ev => setPassword(ev.target.value)}
                                className="slds-input slds-form-element"
                            />
                            <label className="errorLabel">{passwordError}</label>
                        </div>
                        <br />
                        <div className={"inputContainer"}>
                            <select className="slds-input slds-form-element">
                                <option value="Driver">Driver</option>
                                <option value="Customer">Passenger</option>
                            </select>
                        </div>
                        <br />

                        <div class="slds-align--absolute-center">
                            <div className={"inputContainer"}>
                                <input
                                    className="slds-button slds-form-element"
                                    type="button"
                                    onClick={onClickLogin}
                                    value={"Log in"}
                                />
                            </div>
                            <br />
                            <div>
                                <a href="/home">Click here to Sign Up</a>
                            </div>
                        </div>

                        {/*                         <div className="slds-button slds-button_destructive" onClick={getDataFromBackEnd}>
                            GetData
                        </div>
                        <div className="slds-button slds-button_destructive" onClick={saveData}>
                            SaveData
                        </div> */}
                    </div>

                </div>
            </div>

        </div>
    );
};

async function getDataFromBackEnd() {
    /*     axios.get('http://localhost:8000/user/get/')
        .then(res => {
          console.log('Data From BackEnd ' + JSON.stringify(res.data));
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        }) */

    let testData = await getUserData();
    console.log('testData ' + JSON.stringify(testData));
    console.log('testData ', testData);
}

function saveData() {

    let user = {
        "name": "Gunjan",
        "email": "Gunjan@gmail.com",
        "role": "Customer",
        "password": "Gunjan"
    }

    saveUserData(user);
}

async function checkUserExists(email, password) {
    let userData = await getUserData();
    console.log('testData ' + JSON.stringify(userData));
    console.log('testData ', userData);

    return userData.find(driver => {
        console.log("driver.email " + driver.email);
        return email === driver.email && password === driver.password;
    });
}

export default Login;
