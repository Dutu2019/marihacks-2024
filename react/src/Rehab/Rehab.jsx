import React, { useEffect, useRef, useState } from "react";
import Mediapipe from "./Mediapipe";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";
import rehabbg from "../assets/rehabbg.avif";

export default function Rehab() {
  const [isRecording, setIsRecording] = useState(false);
  const [image, setImage] = useState(null);
  const webRef = useRef(null);
  const countRef = useRef(0);
  const intervalID = useRef(null);

  useEffect(() => {
    if (isRecording) {
      intervalID.current = setInterval(() => {
        countRef.current += 1;
      }, 10);
    } else {
      clearInterval(intervalID.current);
      countRef.current = 0;
    }
  }, [isRecording]);

  async function processImg() {
    console.log(image)
    console.log("processing")
    // const result = await ocrSpace(image, {apiKey: "K83644090688957"})
    // console.log(result)
    
  }

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
        }}
      >
        <img
          src={rehabbg}
          draggable="false"
          style={{
            width: "100%",
            height: "100%",
            opacity: "80%",
            objectFit: "cover",
          }}
        ></img>
      </div>
      <div
        style={{
          position: "relative",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ padding: "20px", color: "white" }}>
          Begin the hand rehabilitation process
        </h1>
        {isRecording && (
          <>
            {/* <Webcam ref={webRef} width="600" /> */}
            <Mediapipe style={{width: "600px"}}/>
            <Button variant="primary" onClick={() => {
              setImage(webRef.current.getScreenshot())
              processImg()
            }}>Process image</Button>
          </>
        )}
        <Button
          variant="secondary"
          style={{ backgroundColor: "#f52582", width: "90%" }}
          onClick={() => {
            setIsRecording(!isRecording);
          }}
        >
          {isRecording ? "Get results" : "Start hand rehabilitation"}
        </Button>
      </div>
    </>
  );
}
