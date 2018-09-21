import React from "react";

const SignIn = () => {
    return (
        <div className="container content">
            <div className="banner"></div>
            <h1>Messenger</h1>
            <div className="welcome-message">
                <p>
                    Hello! Welcome to Messenger!
                </p>
                <p>
                    Messenger is a real-time chat application that utilizes WebSockets with Socket.io.
                    Create an account to gain access to true instant messaging, and start messaging your friends.
                </p>

                <p>
                    Signing up is very simple; all you need is a Google account. Once you have an account with Google all you need to do is 
                    click the button in the top right of the screen that says "Sign in with Google". That's all!
                </p>

                <p>
                    I hope you enjoy your experience with Messenger!
                </p>

                <p className="signature">Joe Hinkley, <em>Creator of Messenger</em></p>
            </div>
        </div>
    );
}

export default SignIn;
