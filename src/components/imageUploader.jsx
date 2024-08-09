import React, { useState } from "react";
import axios from "axios";
// import * as fs from 'fs'

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    if (image) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1];
        setResult("Uploading...");

        axios({
          method: "POST",
          url: "https://detect.roboflow.com/bottle-cap-seal/1",
          params: {
            api_key: import.meta.env.VITE_ROBOFLOW_API_KEY,
          },
          data: base64Image,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then(function (response) {
            setResult(
              `${response.data.predictions[0].class} with ${response.data.predictions[0].confidence*100}% confidence`
            );
          })
          .catch(function (error) {
            console.log(error.message);
          });
      };
      reader.readAsDataURL(image);
    }
  };

  return (
    <div style={{
        'display': 'flex',
        'flexDirection': 'column',
        'justifyContent': 'space-between',
        'verticalAlign' : 'middle'

    }}>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && (
        <img
          src={preview}
          alt="Image preview"
          style={{ width: "200px", height: "200px" }}
        />
      )}
      <button onClick={() => handleSubmit()}>Upload Image</button>
      {result}
    </div>
  );
};

export default ImageUploader;
