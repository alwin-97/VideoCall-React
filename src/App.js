import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import './App.css';
import Home from "./routes/Home";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/create-room" exact component={CreateRoom} />
                    <Route path="/room/:roomID" component={Room} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
