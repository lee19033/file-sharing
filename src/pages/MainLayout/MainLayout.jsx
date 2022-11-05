import React, { useState } from "react";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import Header from "../../components/header/header";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import copyImage from "../../assets/images/icons8-copy-48.png";
import "./MainLayout.css";

const MainLayout = () => {
  const [retension, setRetention] = useState(60 * 1000);
  const [imageFile, setImageFile] = useState(null);
  const [response, setResponse] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handlePickedImage = (imageId, pickedFile, fileIsValid) => {
    setImageFile(pickedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        axios
          .put("http://localhost:5000/api/v1/files", formData, {
            headers: { "x-file-retension": `${retension}` },
          })
          .then((res) => {
            const msg = res.data.name;
            setResponse(msg);
            setShowModal(true);
          });
      } catch (err) {
        setShowModal(true);
        setResponse(err);
      }
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(response);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header></Header>

      <div className="card">
        <div className="container">
          <form className="form-control">
            <ImageUpload onInput={handlePickedImage}></ImageUpload>
            <div>
              <input
                name="retension"
                type="text"
                onChange={(e) => setRetention(e.currentTarget.value)}
                placeholder="Add file retension in MS"
                value={retension}
              />
            </div>
            <div>
              <button className="button button-submit" onClick={handleSubmit}>
                Upload Image
              </button>
            </div>
          </form>
        </div>
        <Modal header="File Sharing" show={showModal} onCancel={hideModal}>
          <div className="flex-container">
            <div>
              <a href={response}>{response}</a>
            </div>
            <div className="flex-container_align">
              <img
                className="modal-image"
                src={copyImage}
                onClick={() => copy()}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MainLayout;
