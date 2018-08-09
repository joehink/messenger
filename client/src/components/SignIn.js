import React from "react";

const SignIn = () => {
    return (
        <div style={{ flex: 1, display: "flex" }}>
            <div style={{ margin: "auto", textAlign: "center" }}>
                <h1>Messenger</h1>
                <a href="/auth/google">Sign in with Google</a>
            </div>
        </div>
    );
}

export default SignIn;
