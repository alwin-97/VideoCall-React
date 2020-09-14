import React from "react";
import useScreenRecording from "use-screen-recording";

export default function Record() {
    const { isRecording, recording, toggleRecording } = useScreenRecording();
    let file_url
    return (
        <div>
            <button onClick={toggleRecording} className={"btn btn-success"}>
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            {!!recording && window.open(URL.createObjectURL(recording))
                // (file_url = URL.createObjectURL(recording))
                // <video autoPlay src={recording && URL.createObjectURL(recording)} />
            }
        </div>
    );
}