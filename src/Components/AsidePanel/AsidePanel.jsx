import { Button, CircularProgress } from '@mui/material';
import style from './AsidePanel.module.css';
import { getUserById } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { actionPromise } from '../../Store/promiseReduser';
import { ChatDescription } from '../ChatDescription/ChatDescription';
import { addChats } from '../../Store/chatReducer';
import { Exit } from '../Exit/Exit';
import { useChatSocket } from '../../hooks/useChatSocket';
import { useNavigate } from 'react-router-dom';

export const AsidePanel = () => {

  const dispatch = useDispatch();
  const stateUserId = useSelector((state) => state?.auth?.payload?.sub?.id);
  const state = useSelector((state) => state?.promise?.promiseGetUserById);
  const { status, payload } = state || {};
  const chats = useSelector((state) => state.chat);
  const payloadUserId = payload?.data?.UserFindOne?._id;


  useChatSocket();
const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      console.log(payloadUserId);
      console.log(stateUserId);
      if ( payloadUserId !== stateUserId) {
        const user = await dispatch(actionPromise("promiseGetUserById", getUserById(stateUserId)));
        dispatch(addChats(user.data.UserFindOne.chats));
      }

    })();
  }, [payloadUserId]);





  const openCustomModal = () => {
   navigate("/CreateChatPage")

  };
   return (<div className={style.AsidePanel}>
    {status === 'PENDING' || !status ? (<CircularProgress />) : (<>
      <div className={style.StickyContainer}>
        <Button
          sx={{ margin: "20px" }}
          variant="contained"
          onClick={() => openCustomModal()}
        >
          Add chat
        </Button>


      </div>

      {Object.keys(chats).length ? (
        Object.keys(chats)
          .reverse()
          .map(key =>
            chats[key].members.length > 1 ? (
              <ChatDescription key={key} chat={chats[key]} />
            ) : null
          )
      ) : null}

      <div className={style.StickyContainerFooter}>
        <Exit />
      </div>
    </>)}
  </div>);
};
