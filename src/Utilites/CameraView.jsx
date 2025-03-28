// src/components/CameraView.tsx
import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

const CameraView = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);

  // Request camera permission
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        setCameraPermission(true);
        stream.getTracks().forEach((track) => track.stop()); // Close camera after permission
      }
    } catch (error) {
      console.error("Camera permission denied:", error);
      setCameraPermission(false);
    }
  };

  useEffect(() => {
    // Ask for permission when component mounts
    requestCameraPermission();
  }, []);

  // Capture Photo
  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setCapturedImage(imageSrc || null);
  }, [webcamRef]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      {!capturedImage ? (
        <div className="relative w-full max-w-sm">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "environment", // Use back camera if available
            }}
            className="w-full h-auto rounded-lg border-2 border-gray-700 shadow-md"
          />
          <button
            onClick={capturePhoto}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-5 py-3 rounded-full shadow-md hover:bg-red-600 focus:outline-none"
          >
            Capture
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={capturedImage}
            alt="Captured"
            className="w-full max-w-xs rounded-lg border-2 border-gray-700 shadow-md"
          />
          <button
            onClick={() => setCapturedImage(null)}
            className="mt-4 bg-blue-500 text-white px-5 py-3 rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Retake
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraView;
