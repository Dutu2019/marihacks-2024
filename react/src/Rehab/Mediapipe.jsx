import React, { useEffect, useRef, useState } from 'react'
import {Camera} from "@mediapipe/camera_utils"
import {} from "@mediapipe/control_utils"
import {drawConnectors, drawLandmarks,  } from "@mediapipe/drawing_utils"
import {Hands, HAND_CONNECTIONS} from "@mediapipe/hands"

export default function Mediapipe() {
    const [canvasCtx, setCanvasCtx] = useState();
    const videoElement = useRef();
    const canvasElement = useRef();
    useEffect(() => {
        function onResults(results) {
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.current.width, canvasElement.current.height);
            canvasCtx.drawImage(
                results.image, 0, 0, canvasElement.current.width, canvasElement.current.height);
            if (results.multiHandLandmarks) {
              for (const landmarks of results.multiHandLandmarks) {
                drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                               {color: '#00FF00', lineWidth: 5});
                drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
              }
            }
            canvasCtx.restore();
          }
        setCanvasCtx(canvasElement.current.getContext('2d'));
        console.log(canvasCtx)
        const hands = new Hands({locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          }});
          hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
          });
          hands.onResults(onResults);
          
          const camera = new Camera(videoElement.current, {
            onFrame: async () => {
              await hands.send({image: videoElement.current});
            },
            width: 1280,
            height: 720
          });
          camera.start();
    }, [canvasCtx])
      
  return (
    <div class="container" style={{overflow: "clip", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
    <video class="input_video" ref={videoElement} style={{display: "none"}}></video>
    <canvas class="output_canvas" ref={canvasElement} width="1280px" height="720px"></canvas>
  </div>
  )
}
