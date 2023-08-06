import { Button } from '@mui/material';
import { actionAuthLogout } from '../../Store/authReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { exitChatReducer } from '../../Store/chatReducer';

export const Exit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateChat= useSelector(state => state.chat);
  const exit = () => {
    dispatch(actionAuthLogout());
    dispatch(exitChatReducer())
    navigate("/");

  };
  return (<Button sx={{ margin: "20px" }} variant="contained" onClick={exit}>exit</Button>);
};
