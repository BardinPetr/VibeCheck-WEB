import React from 'react';
import "firebase/auth";
import {FirebaseAuthConsumer, IfFirebaseUnAuthed} from "@react-firebase/auth";

import Dashboard from "./Components/Dashboard/Dashboard";
import SignIn from "./Components/SignIn/SignIn";
import {FirebaseProvider} from "./Firebase/Firebase";


function App() {
    return (
        <FirebaseProvider>
            <FirebaseAuthConsumer>
                {({isSignedIn, user}) => {
                    console.log(user)
                    if (isSignedIn) {
                        return (true ?
                                <Dashboard/>
                                :
                                <h1>NOT ENOUGH RIGHTS</h1>
                        );
                    } else {
                        return (
                            <IfFirebaseUnAuthed>
                                <SignIn/>
                            </IfFirebaseUnAuthed>
                        )
                    }
                }}
            </FirebaseAuthConsumer>
        </FirebaseProvider>
    );
}

export default App;
