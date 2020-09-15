import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import './App.css';
import Home from "./routes/Home";
import TextRoom from "./routes/TextRoom";
import CreateTextRoom from "./routes/CreateTextRoom";

function App() {
    return (
        <div className="App">
            {/*Different Routes in the App
            1. Home / Root
            2. Create Video Call Room
            3. Create Text Chat Room
            4. Join the Room - Video Call
            5. Join the Text Chat Room*/}
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/create-room" exact component={CreateRoom} />
                    <Route path={"/create-text-room"} exact component={CreateTextRoom}/>
                    <Route path="/room/:roomID" component={Room} />
                    <Route path="/textroom/:roomID" component={TextRoom}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
