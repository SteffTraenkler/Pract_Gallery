import { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../api/api";
import ImageList from "../Components/ImageList";

export default function TagsList(props) {
    const { tag } = useParams();

    const [loaded, setLoaded] = useState(true);
    console.log("loaded tags", loaded);

    const [tagFeed, setTagFeed] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("useEffect");
        fetch(apiBaseUrl + "/api/images/tag/" + tag)
            .then(resp => resp.json())
            .then(tagfeed => {
                setLoaded(false);
                if (tagfeed.err) {
                    setError(tagfeed.err);
                } else {
                    setTagFeed(tagfeed);
                    console.log(tagfeed);
                }
            })
    }, []);

    return (
        <main>

            <h1>{tag}</h1>
            {loaded ?
                (<div className="feed-loading-div">
                    <h2>Loading feed...</h2>
                </div>)
                :
                (<ImageList pics={tagFeed} />)}
        </main>
    )
}