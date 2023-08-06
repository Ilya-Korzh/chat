import style from "./CustomModal.module.css";
import { Button } from '@mui/material';
import { CreateChat } from '../CreateChat/CreateChat';
import { useNavigate } from 'react-router-dom';

export const CustomModal = () => {
  const navigate = useNavigate()
  const closeModal = () => {
navigate("/SecondPage")
  };

  return (
    <div className={`${style.customModalWrapper} ${ style.active }`}>
      <div className={style.customModalContentWrapper}>
        <CreateChat />
        <Button
          sx={{ margin: "20px" }}
          variant="contained"
          onClick={closeModal}
        >
          Close
        </Button>
      </div>
    </div>
  );
};
