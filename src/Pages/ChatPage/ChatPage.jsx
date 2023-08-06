import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMessageAndImg, getCountMessagesByChatId, getMessagesByChatId } from "../../api";
import { addMessage, addMessages } from "../../Store/chatReducer";
import { actionPromise } from "../../Store/promiseReduser";
import { AsidePanel } from "../../Components/AsidePanel/AsidePanel";
import { InputChat } from "../../Components/Input/InputChat";
import SendIcon from "@mui/icons-material/Send";
import style from "./ChatPage.module.css";
import { LIMIT_MESSAGES } from "../../constants";
import { Messages } from '../../Components/Messages/Messages';
import { AddImg } from '../../Components/AddImg/AddImg';
import { PreviewImg } from '../../Components/PreviewImg/PreviewImg';

export const ChatPage = () => {
  const [value, setValue] = useState("");
  const [skipMessages, setSkipMessages] = useState(0);
  const [arrImg, setArrImg] = useState([]);

  const { chatId } = useParams();
  const dispatch = useDispatch();

  const messages = useSelector((state) => state?.chat[chatId]?.messages) || [];
  const userId = useSelector((state) => state?.promise?.promiseGetUserById?.payload?.data?.UserFindOne?._id);
  const userPromise = useSelector((state) => state?.promise?.promiseGetUserById);
  const messagesCount = useSelector((state) => state?.promise?.promiseCountMessagesByChatId?.payload?.data?.MessageCount);
  const idOwnerAccount = useSelector(state => state?.auth?.payload?.sub?.id);

  const sendMessageAndImg = async () => {
    const arrImgId = arrImg.map(({ _id }) => ({ _id: _id }));
    const props = { arrImgId, value, chatId };
    const dataMessage = await dispatch(actionPromise("createMessageAndImg", createMessageAndImg(props)));
    const msg = dataMessage?.data?.MessageUpsert;
    const idOwnerMessage = msg?.owner?._id;
    if (idOwnerAccount === idOwnerMessage) {
      dispatch(addMessage(msg, chatId));
    }
    setArrImg([]);
    setValue("");
  };

  useEffect(() => {
    setSkipMessages(0);
    if (userPromise?.status === "FULFILLED") {
      (async () => {
        const dataMessages = await dispatch(actionPromise("messageByChatId", getMessagesByChatId(chatId, 0, LIMIT_MESSAGES)));
        const downloadMessages = dataMessages?.data?.MessageFind;


        const messagesSet = new Set(messages.map(msg => msg._id));
        [...messagesSet].map((el)=>console.log(el))
        const uniqueMessages = downloadMessages.filter(msg => !messagesSet.has(msg._id));

        dispatch(addMessages(uniqueMessages, chatId));

        dispatch(actionPromise("promiseCountMessagesByChatId", getCountMessagesByChatId(chatId)));
      })();
    }
  }, [chatId, dispatch, userPromise]);

  const fetchData = async () => {
    const loadedMessagesCount = messages.length;
    const dataMessages = await dispatch(
      actionPromise(
        "messageByChatId",
        getMessagesByChatId(chatId, loadedMessagesCount, LIMIT_MESSAGES)
      )
    );
    const newMessages = dataMessages?.data?.MessageFind;

    const messagesSet = new Set(messages.map(msg => msg._id));

    const uniqueNewMessages = newMessages.filter(msg => !messagesSet.has(msg._id));

    dispatch(addMessages(uniqueNewMessages, chatId));
  };

  return (
    <div className={style.pageWrapper}>
      <AsidePanel />

      <div className={style.chatWrapper}>

        {messages.length ? <div className={style.messageWrapper}>
          <Messages
            messages={messages}
            userId={userId}
            fetchData={fetchData}
            messagesCount={messagesCount}
          /></div> : null}
        <div className={style.inputWrapper}>
          <AddImg
            setArrImg={setArrImg}
          />
          <InputChat
            sendMessageAndImg={sendMessageAndImg}
            value={value}
            setValue={setValue}
            text="message"
            sx={{ width: "100%" }}
          />
          <SendIcon
            fontSize="large"
            className={style.sendIMG}
            onClick={() => {
              sendMessageAndImg();
            }}
          />
        </div>
        <div className={style.previewWrapper}>
          <PreviewImg
            arrImg={arrImg}
            setArrImg={setArrImg}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
