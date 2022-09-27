import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { apiBaseUrl } from "../api/api";

export default function Image() {
    const { pictureId } = useParams();
    console.log(pictureId);
    const [image, setImage] = useState();

    const [error, setError] = useState("");

    useEffect(() => {
        fetch(apiBaseUrl + "/api/images/" + pictureId)
            .then(resp => resp.json())
            .then((image) => {
                if (image.err) {
                    setError(image.err.message);
                    return;
                };
                setImage(image);
                console.log(image);
            });
    }, []);

    return (
        <>
            {image ?
                (<main>
                    <section>
                        <div className="single-image-container">
                            <img src={image.picture} alt={"image of " + image.description} />
                        </div>

                        <div className="user-info-singleImg">
                            <div className="profilePic-under-image">
                                <img src={image.postedBy.profilePicture} alt="" />
                            </div>
                            <div>
                                <h1>{image.title}</h1>
                                <h3>by <Link to={"/user/" + image.postedBy.username}>{image.postedBy.username}</Link></h3>
                            </div>

                        </div>

                        <div className="tag-container">
                            {image.tags.map((tag, key) =>
                                <Link to={"/tag/" + tag} key={key} className="single-tag">
                                    <p>{tag}</p>
                                </Link>
                            )}
                        </div>
                        <div className="image-description">
                            <p>{image.description}</p>
                        </div>

                    </section>
                    <section>
                        <article className="username-and-pic-cont">


                        </article>
                    </section>
                </main>)
                : <div><h2>{error}</h2></div>
            }
        </>
    )
}
