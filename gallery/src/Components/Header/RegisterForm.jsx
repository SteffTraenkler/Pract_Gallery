import { useState } from "react";
import { apiBaseUrl } from "../../api/api";

export default function RegisterForm(props) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");


    const doRegistration = (event) => {
        props.setRegForm(false);
        event.preventDefault();

        fetch(apiBaseUrl + "/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, username, password })
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (!data.err) {
                    return;
                };

                if (data.err.validationErrors) {
                    const firstError = data.err.validationErrors[0];
                    setError(firstError.msg + ":" + firstError.param);
                    return;

                };

                setError(data.err.message);

                props.setRegForm(false);
            });
    };

    return (
        <div className="reg-form-container">
            <form className="login-reg-form">
                <input type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    autoComplete="on"
                />

                <input type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Type in your username"
                    autoComplete="off"
                />

                <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                    autoComplete="off"
                />

                {error && <h2>{error}</h2>}

                <button onClick={doRegistration} type="submit">Register</button>
            </form>
        </div>
    )
}