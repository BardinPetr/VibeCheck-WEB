import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from "./FirebaseConfig";
import {FirestoreProvider} from "@react-firebase/firestore";
import {FirebaseAuthProvider} from "@react-firebase/auth";
import React from "react";

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();


export const FirebaseProvider = props => (
    <FirebaseAuthProvider {...config} firebase={firebase}>
        <FirestoreProvider {...config} firebase={firebase}>
            {props.children}
        </FirestoreProvider>
    </FirebaseAuthProvider>
);