import { useEffect, useState } from "react"
import { apiBaseUrl } from "../api/api"
import { Link } from "react-router-dom"
import ImageList from "../Components/ImageList";

export default function Home(props) {
    const [loaded, setLoaded] = useState(true);

    const [feed, setFeed] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(apiBaseUrl + "/api/images/feed")
            .then(resp => resp.json())
            .then(feed => {
                setLoaded(false);
                if (feed.err) {
                    setError(feed.err);
                } else {
                    setFeed(feed);
                };
            });
    }, []);

    return (
        <main>
            <h1>Gallery</h1>
            {loaded ? (<div className="feed-loading-div">
                <h2>Loading feed...</h2>
            </div>)
                :
                (<ImageList pics={feed} />)}
        </main>
    )
}