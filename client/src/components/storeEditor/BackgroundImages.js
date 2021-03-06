import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentStore, getOwnerStore } from "../../redux/actions/stores.actions";
import api from "../../utils/api";
import Alert from "../Alert";

function BackgroundImages() {
  const dispatch = useDispatch();
  const { ownerStore } = useSelector((state) => state.stores);
  const [background_image, setBG] = useState(ownerStore.background_image);
  const [bg_scroll, setBgScroll] = useState(ownerStore.bg_scroll);
  const [about_image, setAboutImage] = useState(ownerStore.about_image);
  const [about_scroll, setAboutScroll] = useState(ownerStore.about_scroll);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const handleSubmitClose = () => setShowSubmit(false);
  const handleSubmitShow = () => setShowSubmit(true);

  const handleImageClose = () => setShowImage(false);
  const handleImageShow = () => setShowImage(true);

  const bgUpload = () => {
    handleImageUpload("bg-image");
  };

  const aboutImageUpload = () => {
    handleImageUpload("about-image");
  };
  const handleImageUpload = (imageType) => {
    let fd = new FormData();
    if (imageType === "bg-image") {
      fd.append("file", background_image);
    } else {
      fd.append("file", about_image);
    };
    console.log(fd);
    api.uploadImage(imageType, ownerStore.id, fd).then(result => {
      console.log(result);
      api.getStoreByOwner(ownerStore.UserId).then((data) => {
        console.log(data);
        dispatch(getOwnerStore(data.data));
        dispatch(getCurrentStore(data.data));
        handleImageShow();
      }).catch(err => console.log(err));
    });
  };

  const handleScrollSubmit = (event) => {
    event.preventDefault();
    api
      .updateStore(ownerStore.id, { bg_scroll, about_scroll })
      .then((result) => {
        api.getStoreByOwner(ownerStore.UserId).then((data) => {
          dispatch(getOwnerStore(data.data));
          dispatch(getCurrentStore(data.data));
          handleSubmitShow();
        });
      });
  };

  return (
    <div>
      <Alert 
        show = {showImage}
        handleClose = {handleImageClose}
        title = {"Store Editor"}
        message = {"Your image has been uploaded!"}
      />
      <Alert 
        show = {showSubmit}
        handleClose = {handleSubmitClose}
        title = {"Store Editor"}
        message = {"Background Images updated!"}
      />
      <div
        className="tab-pane fade show active"
        id="list-background"
        role="tabpanel"
        aria-labelledby="list-settings-list"
      >
        <form
          className="col-12 p-4"
          id="bg-image-form"
          onSubmit={handleScrollSubmit}
        >
          <label for="exampleFormControlInput1">Background Image</label>
          <div className="input-group pb-3">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="bg-image"
                aria-describedby="inputGroupFileAddon04"
                onChange={(e) => setBG(e.target.files[0])}
              />
              <label
                className="custom-file-label"
                for="bg-image"
                id="bg-edit-name"
              >
                {!background_image.name ? "Choose File" : background_image.name}
              </label>
            </div>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary button-color"
                type="button"
                id="bg-image-upload"
                onClick={bgUpload}
              >
                Upload
              </button>
            </div>
          </div>

          <label for="exampleFormControlInput1">Scroll Behavior</label>
          <div className="input-group mb-3">
            <select
              className="custom-select"
              id="bg-scroll"
              onChange={(e) => setBgScroll(e.target.value)}
            >
              <option value={bg_scroll} selected>
                {bg_scroll}
              </option>
              <option value="Scroll">Scroll</option>
              <option value="Fixed">Fixed</option>
            </select>
            <div className="input-group-append">
              <label className="input-group-text" for="inputGroupSelect02">
                Options
              </label>
            </div>
          </div>

          <label for="exampleFormControlInput1">About Image</label>
          <div className="input-group mb-3">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="about-image"
                aria-describedby="inputGroupFileAddon04"
                onChange={(e) => setAboutImage(e.target.files[0])}
              />
              <label
                className="custom-file-label"
                for="about-image"
                id="about-edit-name"
              >
                {!about_image.name? "Choose File" :about_image.name}
              </label>
            </div>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary button-color"
                type="button"
                id="about-image-upload"
                onClick={aboutImageUpload}
              >
                Upload
              </button>
            </div>
          </div>

          <label for="exampleFormControlInput1">Scroll Behavior</label>
          <div className="input-group mb-3">
            <select
              className="custom-select"
              id="about-scroll"
              onChange={(e) => setAboutScroll(e.target.value)}
            >
              <option value={about_scroll} selected>
                {about_scroll}
              </option>
              <option value="Scroll">Scroll</option>
              <option value="Fixed">Fixed</option>
            </select>
            <div className="input-group-append">
              <label className="input-group-text" for="inputGroupSelect02">
                Options
              </label>
            </div>
          </div>
          <div className="text-right">
            <button type="submit" className="btn btn-dark" id="scroll-submit">
              Update
            </button>
          </div>

          <div className="text-right updateStatus"></div>
        </form>
      </div>
    </div>
  );
}

export default BackgroundImages;
