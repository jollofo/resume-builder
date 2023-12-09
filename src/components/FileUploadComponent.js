import React, { useState } from "react";

export default function FileUploader() {
  const [progress, setProgress] = useState(0);

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const percentComplete = Math.round((e.loaded / e.total) * 100);
        setProgress(percentComplete);
      }
    });
    xhr.upload.addEventListener("complete", (e) => {
      setProgress(100);
    });
    xhr.open("POST", "./public/uploads");
    xhr.send(formData);
  };

  const handleFileChange = ({ target }) => {
    const file = target.value;
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <div>
      <h1>Enter your resume here</h1>
      <input type="file" onChange={handleFileChange} />
      <h2>Upload Progress: {progress}%</h2>
    </div>
  );
}
