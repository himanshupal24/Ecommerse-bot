import axios from "axios";
import React, { useState } from "react";

function AudioToText() {
  const [transcription, setTranscription] = useState("");
  const [audioChunks, setAudioChunks] = useState([]);
  const mediaRecorderRef = React.useRef(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = function (event) {
          setAudioChunks([...audioChunks, event.data]);
        };

        mediaRecorder.start();
        console.log("Recording started");
      })
      .catch(function (error) {
        console.error("Error accessing microphone:", error);
      });
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      console.log("Recording stopped");
      processAudio();
    }
  };

  const processAudio = () => {
    const audioBlob = new Blob(audioChunks);
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");

    axios
      .post(
        "https://861f-202-131-110-21.ngrok-free.app/process_audio",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((response) => {
        // Directly access response data
        setTranscription(response.data.transcription);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setAudioChunks([]);
  };

  return (
    <div>
      <h1>Audio to Text</h1>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <div>Transcription: {transcription}</div>
    </div>
  );
}

export default AudioToText;
