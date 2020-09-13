import React, {useRef, useEffect} from "react";
import io from "socket.io-client";
import logo from "./logo.png";
import {Link} from 'react-router-dom';
import Record from "./recording";

const Room = (props) => {
    const userVideo = useRef();
    const partnerVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();
    const senders = useRef([]);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(stream => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;

            socketRef.current = io.connect("/");
            socketRef.current.emit("join room", props.match.params.roomID);

            socketRef.current.on('other user', userID => {
                callUser(userID);
                otherUser.current = userID;
            });

            socketRef.current.on("user joined", userID => {
                otherUser.current = userID;
            });

            socketRef.current.on("offer", handleRecieveCall);

            socketRef.current.on("answer", handleAnswer);

            socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
        });

    }, []);

    function callUser(userID) {
        peerRef.current = createPeer(userID);
        userStream.current.getTracks().forEach(track => senders.current.push(peerRef.current.addTrack(track, userStream.current)));
    }

    function createPeer(userID) {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                },
            ]
        });

        peer.onicecandidate = handleICECandidateEvent;
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

        return peer;
    }

    function handleNegotiationNeededEvent(userID) {
        peerRef.current.createOffer().then(offer => {
            return peerRef.current.setLocalDescription(offer);
        }).then(() => {
            const payload = {
                target: userID,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            };
            socketRef.current.emit("offer", payload);
        }).catch(e => console.log(e));
    }

    function handleRecieveCall(incoming) {
        peerRef.current = createPeer();
        const desc = new RTCSessionDescription(incoming.sdp);
        peerRef.current.setRemoteDescription(desc).then(() => {
            userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
        }).then(() => {
            return peerRef.current.createAnswer();
        }).then(answer => {
            return peerRef.current.setLocalDescription(answer);
        }).then(() => {
            const payload = {
                target: incoming.caller,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            }
            socketRef.current.emit("answer", payload);
        })
    }

    function handleAnswer(message) {
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
    }

    function handleICECandidateEvent(e) {
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate,
            }
            socketRef.current.emit("ice-candidate", payload);
        }
    }

    function handleNewICECandidateMsg(incoming) {
        const candidate = new RTCIceCandidate(incoming);

        peerRef.current.addIceCandidate(candidate)
            .catch(e => console.log(e));
    }

    function handleTrackEvent(e) {
        partnerVideo.current.srcObject = e.streams[0];
    }

    function shareScreen() {
        navigator.mediaDevices.getDisplayMedia({cursor: true}).then(stream => {
            const screenTrack = stream.getTracks()[0];
            senders.current.find(sender => sender.track.kind === 'video').replaceTrack(screenTrack);
            screenTrack.onended = function () {
                senders.current.find(sender => sender.track.kind === "video").replaceTrack(userStream.current.getTracks()[1]);
            }
        })
    }

    function sendEmail(e) {
        e.preventDefault();

        alert('Mail with the Meeting Link is Send to the Other User !')
    }

    return (
        <div className={""} style={{backgroundColor: "black"}}>
            <br/>
            <img src={logo} style={{height: 150}} alt={""}/>
            <br/>
            <h5 style={{color: "white"}}>Meeting Url : {window.location.href}</h5>
            <br/>
            <form onSubmit={sendEmail} method={"post"}>
                <label style={{color: "white"}}>Enter Email(s) to invite to the meeting</label>&nbsp;&nbsp;
                <input type={"text"} name={"to_email"}/>&nbsp;&nbsp;
                <input type={"submit"} className={"btn btn-success"} value={"Send"}/>
            </form>
            <br/>
            <div>
                <video controls style={{width: 500}} autoPlay ref={userVideo}/>
                &nbsp;&nbsp;
                <video controls style={{width: 500}} autoPlay ref={partnerVideo}/>
            </div>
            <br/><br/>
            {/*<button className={"btn btn-success"}>Record Meeting</button>*/}
            <span style={{alignItems:"center"}}>
                <Record/>
                <br/>
                <button onClick={shareScreen} className={"btn btn-warning"}>Share Screen</button>
                &nbsp;&nbsp;
                <Link to={'/'} className={"btn btn-danger"}>End Call</Link>
            </span>
            <br/><br/> <br/>
            <div style={{color: "white"}}>
                <span style={{textAlign: "center"}}>About US | Contact US | Support US </span>
                <br/>
                <span style={{textAlign: "center"}}>@VideoCall. All Rights Recieved</span>
                <br/>
                <span style={{textAlign: "center"}}>Made in <span style={{color: "red"}}>❤</span> with Open Source Software</span>
                <br/><br/>
            </div>
        </div>
    );
};

export default Room;