import { useState } from "react";
import { apiBaseUrl } from "../../api/api";

export default function LoginForm(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const loginUser = (event) => {
        props.setLogForm(false);
        event.preventDefault();

        fetch(apiBaseUrl + "/api/users/login", {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ username, password })
        }).then(resp => resp.json())
            .then(data => {
                if (!data.err) {
                    props.loginSuccess(data.token);
                    return;
                }

                if (data.err.validationErrors) {
                    const firstError = data.err.validationErrors[0];
                    setError(firstError.msg + ":" + firstError.param);
                    return;
                }

                setError(data.err.message);
            });
    };

    return (
        <div className="login-form-container">
            <form className="login-reg-form">
                <input type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username or Email"
                />

                <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="off"
                />

                <button onClick={loginUser} type="submit">Login</button>
            </form>
        </div>
    )
}