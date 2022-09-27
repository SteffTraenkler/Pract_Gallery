import { useEffect } from "react";
import { useState } from "react";
import { apiBaseUrl } from "../api/api";

export default function AuthRequired(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.token) {
            setLoading(false);
            return;
        };

        fetch(apiBaseUrl + "/api/users/refreshtoken", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(resp => resp.json())
            .then(data => {
                setLoading(false);
                if (data.token) {
                    props.setToken(data.token);
                };
            });
    }, [props]);

    if (loading) {
        return <p>loading...</p>
    }

    return <>{props.children}</>
}