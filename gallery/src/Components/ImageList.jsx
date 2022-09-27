import { Link } from "react-router-dom";

export default function ImageList(props) {
    return (
        <div className="gallery-grid">
            {props.pics.map((pic, i) => {
                return (<div key={i} className="imageContainer">
                    <div className="image">
                        <img src={pic.picture} alt={"image for" + pic.title} />
                    </div>
                    <Link to={"/image/" + pic._id}>
                        <div className="imageHover">
                            <h2>{pic.title}</h2>
                            <div className="img-user-info">
                                <div className="user-info-avatar">
                                    <img src={pic.postedBy.profilePicture} alt={"Avatar of " + pic.postedBy.username} />
                                </div>
                                <p>{pic.postedBy.username}</p>
                            </div>

                        </div>
                    </Link>
                </div>)
            })
            }

        </div>
    )
}