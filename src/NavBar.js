import johnwick from "/Users/gkubde/Documents/2023cfse003RideShare/frontend/ridesharereact/src/images/JohnWick.png";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
    const navigate = useNavigate();

    const logOut = () => {
        navigate("/login");
    }

    return <div className="slds-grid slds-wrap slds-box_xx-small slds-theme--default slds-grid--align-spread slds-grid--vertical-align-center wrapper">
        <div className="slds-col slds-size--1-of-3">
            <img height={30} src={johnwick} style={{ "borderRadius": "10px", "fontSize": "larger" }} alt="profileIcon" className="slds-icon"></img>
        </div>
        <div className="slds-col slds-size--1-of-3">
            <p className="titleContainer" style={{ "font-size": "25px" }}>RideShare</p>
        </div>
        <div className="slds-col slds-size--1-of-3 slds-grid slds-grid--align-end">
            <div className="UserProfileSection">
                <p className="slds-input hide-below-500px">{props.name}</p>
                <input
                    className="inputButton"
                    type="button"
                    onClick={logOut}
                    value={"Log Out"}
                    style={{ "font-size": "15px" }} />
            </div>
        </div>
    </div>;
}

export default NavBar;