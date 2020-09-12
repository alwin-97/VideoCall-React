import React, {Component} from 'react';
import firebase from "firebase";
import logo from "./logo.png";
import StyleFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {StyledFirebaseAuth} from "react-firebaseui/index";
import CreateRoom from "./CreateRoom";

firebase.initializeApp({
    apiKey: "AIzaSyBF0G562vX2uA3zbBBM_oY6L5j-l1hdmfE",
    authDomain: "videocall-4ec29.firebaseapp.com",
});

class Home extends Component {

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
                        <div style={{backgroundColor:"black"}}>
                            <br/><br/>
                            <img src={logo} style={{height: 150}} alt={""}/>
                            <br/><br/>
                            <h1 style={{color: "white"}}>Welcome {firebase.auth().currentUser.displayName}</h1>
                            <p style={{color:"grey"}}>Simple and easy way to connect with friends !</p>
                            <br/><br/>
                            <img src={firebase.auth().currentUser.photoURL} alt={"Profile Image"}/><br/>
                            <div style={{color: "white"}}>
                                <p>{firebase.auth().currentUser.displayName}</p>
                                <p>{firebase.auth().currentUser.email}</p>
                                <p>{firebase.auth().currentUser.phoneNumber}</p>
                            </div>
                            <button onClick={() => firebase.auth().signOut()} className={"btn btn-danger"}> Sign out !
                            </button> &nbsp; &nbsp;

                            <CreateRoom/>
                            <br/><br/><br/><br/><br/>
                            <footer style={{color: "white"}}>
                                <div>
                            <span style={{textAlign: "center"}}>
                                About US | Contact US | Support US
                            </span>
                                </div>
                                <br/>
                                <span style={{textAlign: "center"}}>@VideoCall. All Rights Recieved</span>
                                <br/>
                                <span style={{textAlign: "center"}}>Made in <span style={{color: "red"}}>❤</span> with Open Source Software</span>
                                <br/><br/>
                            </footer>
                        </div>)
                    :
                    (<div style={{backgroundColor: "grey"}}>
                        <br/><br/>
                        <img src={logo} style={{height: 150}} alt={""}/>
                        <br/>
                        <h1 style={{color: "white"}}>Welcome to VideoCall App</h1>
                        <br/><br/>
                        <h4>SignIn to continue ...</h4>
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                        <br/><br/><br/><br/><br/><br/>
                        <br/><br/><br/><br/><br/>
                        <footer style={{color: "white"}}>
                            <div>
                            <span style={{textAlign: "center"}}>
                                About US | Contact US | Support US
                            </span>
                            </div>
                            <br/>
                            <span style={{textAlign: "center"}}>@VideoCall. All Rights Recieved</span>
                            <br/>
                            <span style={{textAlign: "center"}}>Made in <span style={{color: "red"}}>❤</span> with Open Source Software</span>
                            <br/><br/>
                        </footer>
                    </div>)
                }
            </div>
        );
    }
}

export default Home;
