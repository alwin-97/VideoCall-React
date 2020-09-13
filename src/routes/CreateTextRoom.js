import React, {Component} from "react";
import {v1 as uuid} from "uuid";
import {Link} from 'react-router-dom';

function CreateTextRoom() {
    return (
        <Link to={"/textroom/" + uuid()} style={{color: "white", textDecoration: false}} className={"btn btn-success"}>Text Chat Room</Link>
    );
}

export default CreateTextRoom;