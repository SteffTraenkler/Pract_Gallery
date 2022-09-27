import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiBaseUrl } from "../api/api";
import ImageList from "../Components/ImageList";

export default function Profile(props) {
    const { userId } = useParams();

    const [user, setUser] = useState();
    const [error, setError] = useState("");

    const profileInfo = props.profileInfo;

    useEffect(() => {
        fetch(apiBaseUrl + "/api/users/profile/" + userId)
            .then(resp => resp.json())
            .then(data => {
                if (data.err) {
                    setError(data.err.message);
                    return;
                };
                console.log("userdata", data);
                setUser(data);
            })
    }, [userId]);

    let userID = user ? user._id : "user not fetched yet.";
    let profileInfoID = profileInfo === null ? "ProfileInfo not fetched" : profileInfo._id;

    return (
        <main>
            {user ? (
                <>
                    <section className="sec-profile-info-user">
                        <div className="profile-user-info-container">
                            <h1>{user.username}</h1>
                            <div className="profile-user-info-img-cont">
                                <img src={user.profilePicture} alt={"Avatar of " + user.username} />
                            </div>
                            <p>Posted Images: {user.images.length}</p>
                        </div>
                        {profileInfoID === userID ?
                            <div>
                                <Link to={"/settings/editProfile/" + userId}>
                                    <h3 className="edit-profile-link">Edit Profile</h3>
                                </Link>
                            </div>
                            : null
                        }
                    </section>
                    <section>
                        <h1>Gallery</h1>
                        <ImageList pics={user.images} />
                    </section>
                </>
            ) : (<h2>Loading...</h2>)
            }
        </main>
    )


}