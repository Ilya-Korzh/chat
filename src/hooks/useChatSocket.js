import io from "socket.io-client";
import { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, addMessage, deleteChatReducer, } from '../Store/chatReducer';


export const useChatSocket = () => {
  const dispatch = useDispatch();

  const idOwnerAccount = useSelector(state => state?.auth?.payload?.sub?.id);

  useEffect(() => {

    const socket = io("ws://chat.ed.asmer.org.ua/");
    if (localStorage.authToken) {
      socket.emit('jwt', localStorage.authToken);
    }

    socket.on('jwt_ok', data => {
      console.log('jwt_ok', data);

    });
    socket.on('jwt_fall', error => console.log('jwt_fall', error));
    socket.on('msg', async msg => {

      const idOwnerMessage = msg.owner._id;
      const chatId = msg?.chat?._id;

      if (idOwnerAccount !== idOwnerMessage) {
        dispatch(addMessage(msg, chatId));
      }

    });
    socket.on('chat', async chat => {
      dispatch(addChat(chat));
    });

    socket.on('chat_left', data => {
      console.log('chat_left', data);
      const chatId = data._id
      dispatch(deleteChatReducer({ chatId, idOwnerAccount }));
    });
  }, []);

};
