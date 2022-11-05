import React, { useRef, useState, useEffect } from "react";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files || event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && (
            <img src={previewUrl} alt="Preview" width="150px" height="150px" />
          )}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <button
          className="button button-pick"
          type="button"
          onClick={pickImageHandler}
        >
          PICK IMAGE
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
