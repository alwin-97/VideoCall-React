import React from "react";
import useScreenRecording from "use-screen-recording";

export default function Record() {
    const { isRecording, recording, toggleRecording } = useScreenRecording();
    let file_url
    return (
        <div>
            <button onClick={toggleRecording}>
                {isRecording ? "Stop" : "Start Recording"}
            </button>

            {!!recording && (file_url = URL.createObjectURL(recording)) &&
                window.open(file_url)
                // <video autoPlay src={recording && URL.createObjectURL(recording)} />
            }
        </div>
    );
}