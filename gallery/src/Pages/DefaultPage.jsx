import { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import LoginForm from "../Components/Header/LoginForm";
import RegisterForm from "../Components/Header/RegisterForm";

export default function DefaultPage(props) {
    const [regForm, setRegForm] = useState(false);
    const [logForm, setLogForm] = useState(false);
    const profileInfo = props.profileInfo;

    let navigate = useNavigate();

    const nav = (event) => {
        event.preventDefault();
        navigate("/add");
    };

    const navHome = (event) => {
        event.preventDefault();
        navigate("/");
    };

    return (
        <>
            <header>
                <nav>
                    <div onClick={(e) => navHome(e)} className="clickNav">
                        <h1>Home</h1>
                    </div>
                    {!props.token && <div>
                        <div onClick={(e) => { logForm ? setLogForm(false) : setLogForm(true); setRegForm(false) }} className="clickNav">
                            <h1>Login</h1>
                        </div>
                        <div>

                        </div>
                    </div>}
                    {logForm && <LoginForm loginSuccess={props.loginSuccess} setLogForm={setLogForm} />}
                    {!props.token && <div>
                        <div onClick={(e) => { regForm ? setRegForm(false) : setRegForm(true); setLogForm(false) }} className="clickNav">
                            <h1>Register</h1>
                        </div>
                        {regForm && <div>
                            <RegisterForm setRegForm={setRegForm} regForm={regForm} />
                        </div>}
                    </div>}

                    {profileInfo !== null &&
                        <Link to={"/user/" + profileInfo.username}>
                            <div className="navbar-profileInfo">
                                <h2 className="navbar-hidden-username">{profileInfo.username}</h2>
                                <div className="navbar-profilePic-container">
                                    <img src={profileInfo.profilePicture} alt={"Profile Picture of " + profileInfo.username} />
                                </div>
                            </div>
                        </Link>}

                    {props.token && <button onClick={(e) => nav(e)} className="addImage">Submit</button>}
                </nav>
            </header>

            <Outlet />

            <footer>
                <p>2022-08 ©ZY Practice Project Gallery</p>
            </footer>
        </>
    )
}