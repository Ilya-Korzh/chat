import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { URLWithoutGQL } from '../../constants';
import style from "./AddImg.module.css";
import AttachFileIcon from '@mui/icons-material/AttachFile';


export const AddImg = ({ setArrImg }) => {



  const [isLoading, setIsLoading] = useState(false);
  const [dragEnter, setDragEnter] = useState(false);

  const dragEnterHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };
  const dragLeaveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };


  const postFiles = async (file) => {
    const formData = new FormData();
    formData.append("media", file);

    try {
      const response = await fetch(`${URLWithoutGQL}/upload`, {
        method: "POST",
        headers: localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {},
        body: formData,
      });

      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileUpload = async (files) => {
    setIsLoading(true);
    try {
      for (const fileKey in files) {
        if (files.hasOwnProperty(fileKey)) {
          const response = await postFiles(files[fileKey]);
          setArrImg(prevState => [...prevState, response]);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setIsLoading(false);

  };



  const dropHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
    const files = e.dataTransfer.files;
    await handleFileUpload(files);
  };
  const fileUploadHandler = async (e) => {
    const files = e.target.files;
    await handleFileUpload(files);
  };
  return (
    <div>
      {!dragEnter ? (
        <>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <label>
              <AttachFileIcon
                color="info"
                fontSize="large"
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragEnterHandler} className={style.labelFile}
              />
              <input
                accept=".jpg,.jpeg,.png,.pdf"
                multiple={true}
                onChange={fileUploadHandler}
                type="file"
                className={style.inputFile}
              />
            </label>
          )}
        </>
      ) : (
        <AttachFileIcon
          fontSize="large"
          color="success"
          onDragEnter={dragEnterHandler}
          onDragOver={dragEnterHandler}
          onDragLeave={dragLeaveHandler}
          onDrop={dropHandler}
          className={style.labelFile}
        ></AttachFileIcon>
      )}
    </div>
  );
};
