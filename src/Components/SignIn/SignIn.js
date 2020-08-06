import React, {useState} from "react";
import Container from "@material-ui/core/Container";

import * as firebase from "firebase/app";
import "firebase/auth";

const SignIn = () => {

    return (
        <Container maxWidth="sm">
            <button
                onClick={() => {
                    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                    firebase.auth().signInWithPopup(googleAuthProvider);
                }}
            >
                Sign In with Google
            </button>
        </Container>
    );
};
export default SignIn;