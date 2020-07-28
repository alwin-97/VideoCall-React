import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "firebase";
import StyleFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {StyledFirebaseAuth} from "react-firebaseui/index";

firebase.initializeApp({
    apiKey: "AIzaSyBF0G562vX2uA3zbBBM_oY6L5j-l1hdmfE",
    authDomain: "videocall-4ec29.firebaseapp.com",
});

class App extends Component {

    state = {isSignedIn: false}

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callback: {
            signInSuccess: () => false
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({isSignedIn: !!user})
            // console.log(user);
        })
    }

    render() {
        return (
            <div className="App">
                {this.state.isSignedIn ? (
                        <span>
                        <div>Signed In !</div>
                        <button onClick={() => firebase.auth().signOut()}> Sign out !</button>
                        <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                        <img src={firebase.auth().currentUser.photoURL} alt={"Profile Image"}/>
                    </span>)
                    :
                    (<StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}
                    />)
                }
            </div>
        );
    }
}

export default App;
