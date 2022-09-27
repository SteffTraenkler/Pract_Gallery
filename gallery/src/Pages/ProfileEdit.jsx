import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../api/api";

export default function EditProfile(props) {
    const profileInfo = props.profileInfo;

    const [profilePicture, setProfilePicture] = useState();
    const [newUsername, setNewUsername] = useState("");

    const [imgPreview, setImgPreview] = useState();
    const fileInputRef = useRef();

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const returnToPreviousSite = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (profilePicture) {
            const imgreader = new FileReader();
            imgreader.onloadend = () => {
                setImgPreview(imgreader.result);
            };
            imgreader.readAsDataURL(profilePicture);
        } else {
            setImgPreview(null);
        };
    }, [profilePicture]);

    const editProfile = (event) => {
        event.preventDefault();

        if (!profilePicture && !newUsername) {
            setError("Nothing to change");
            return;
        };

        const formData = new FormData();

        if (profilePicture) {
            formData.set("profilePicture", profilePicture, profilePicture.name);
            setError("");
        };

        if (newUsername) {
            formData.set("username", newUsername);
            setError("");
        };

        fetch(apiBaseUrl + "/api/users/profile/editProfile", {
            method: "PUT",
            headers: {
                token: "JWT " + props.token,
            },
            body: formData,
        })
            .then(resp => resp.json())
            .then(data => {
                if (data._id && (data.newUsername || data.profilePicture)) {
                    return;
                };
                console.log(profileInfo.username);
                console.log("data", data);
                navigate("/");
            });
    };

    return (
        <main>
            <section>
                {profileInfo === null ? (
                    <h1>Loading...</h1>
                )
                    : (
                        <div className="container-profile-edit">
                            <div className="edit-profile-userinfo">
                                <div>
                                    <div className="edit-profile-userinfo-curr-pic_cont">
                                        <img src={imgPreview ? imgPreview : profileInfo.profilePicture} alt="your chosen image" />
                                        {imgPreview ? (<div onClick={() => { fileInputRef.current.value = null; setProfilePicture(); }} className="delete-new-choosen-pic-on-edit-profile-btn">
                                            <div>X</div>
                                        </div>) : null}
                                    </div>

                                </div>
                                <h1>{profileInfo.username}</h1>
                            </div>

                            <div onClick={() => { fileInputRef.current.click(); }} className="change-profile-pic-btn"><h2>Change Profile Pic</h2></div>

                            <input type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={(e) => {
                                    setProfilePicture(e.target.files[0])
                                }}
                                className="hidden-file-input"
                            />

                            <h3>Change your username:</h3>

                            <form>
                                <div>
                                    {/* <label htmlFor="username">Username</label> */}
                                    <input type="text" name="username" className="change-username-input" onChange={(e) => setNewUsername(e.target.value)} placeholder={profileInfo.username} />
                                </div>
                            </form>

                            {error && <p>{error}</p>}


                            <div className="cancel-and-save-cont">
                                <div className="cancel-btn">
                                    <h3 onClick={returnToPreviousSite}>Cancel</h3>
                                </div>
                                <div onClick={profilePicture || newUsername ? editProfile : null} className="save-changes-btn">
                                    <h3>Save Changes</h3>
                                </div>
                            </div>


                            {/* <div onClick={() => { fileInputRef.current.click(); }} className="change-profile-pic-btn"><h2>Change Profile Pic</h2></div>

                            <input type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={(e) => {
                                    setProfilePicture(e.target.files[0])
                                }}
                                className="hidden-file-input"
                            /> */}
                        </div>
                    )
                }
            </section>
        </main>
    )
}