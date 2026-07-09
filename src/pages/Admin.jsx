import { useState } from "react";

export default function Admin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        await fetch("http://localhost:8000/api/honeypot/log", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                endpoint: "/admin",
                attack_type: "Fake Admin Login",
                username,
                userAgent: navigator.userAgent,
            }),
        });

        alert("Invalid Username or Password");
    }

    return (
        <div style={{ margin: "100px auto", width: "350px" }}>
            <h2>Administrator Login</h2>

            <form onSubmit={handleSubmit}>

                <input
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button>Login</button>

            </form>
        </div>
    );
}