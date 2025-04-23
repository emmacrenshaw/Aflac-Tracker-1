
import React, { useState } from "react";

const statuses = [
  "Received - Not In Review",
  "In Review",
  "Need More Information",
  "Completed"
];

const sampleData = {
  "123456": { status: 0, file: null },
  "234567": { status: 1, file: null },
  "345678": { status: 2, file: null },
  "456789": { status: 3, file: null }
};

export default function DocumentTracker() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [statusIndex, setStatusIndex] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleTrack = () => {
    const record = sampleData[trackingNumber];
    if (record) {
      setStatusIndex(record.status);
      setNotFound(false);
      setUploadSuccess(false);
    } else {
      setStatusIndex(null);
      setNotFound(true);
    }
  };

  const handleFileUpload = () => {
    if (trackingNumber && sampleData[trackingNumber] && file) {
      sampleData[trackingNumber].file = file;
      setUploadSuccess(true);
      setFile(null);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Aflac Document Tracker</h1>
      <input
        placeholder="Enter Tracking Number"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
      />
      <button onClick={handleTrack} style={{ padding: "0.5rem 1rem" }}>
        Track
      </button>

      {notFound && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          Tracking number not found. Please try again.
        </p>
      )}

      {statusIndex !== null && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Status Timeline:</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {statuses.map((status, idx) => (
              <div key={idx} style={{ textAlign: "center", width: "24%" }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: idx <= statusIndex ? "green" : "lightgray",
                    margin: "0 auto"
                  }}
                ></div>
                <p style={{ fontSize: "0.75rem" }}>{status}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <h3>Upload Supporting Document</h3>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ marginBottom: "1rem" }}
            />
            <button onClick={handleFileUpload} style={{ padding: "0.5rem 1rem" }}>
              Upload
            </button>
            {uploadSuccess && (
              <p style={{ color: "green", marginTop: "1rem" }}>
                File uploaded successfully!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
