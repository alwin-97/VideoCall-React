import React, {Component} from "react";
import {v1 as uuid} from "uuid";
import {Link} from 'react-router-dom';

// const CreateRoom = (props) => {
//     function create() {
//         const id = uuid();
//         props.history.push(`/room/${id}`);
//     }
//
//     return (
//         <button onClick={create}>Create Room</button>
//     );
// }

function CreateRoom() {
    return (
        <Link to={"/room/" + uuid()} style={{color: "white", textDecoration: false}} className={"btn btn-success"}>Video Call Room</Link>
    );
}

export default CreateRoom;