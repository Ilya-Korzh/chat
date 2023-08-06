import { Link, useLocation, useNavigate } from 'react-router-dom';
import style from '../AsidePanel/AsidePanel.module.css';
import { Avatar } from '@mui/material';
import { useState, useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux';
import { URLWithoutGQL } from '../../constants';
import { actionPromise } from '../../Store/promiseReduser';
import { chatDelete } from '../../api';

export const ChatDescription = ({ chat }) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const loginOwnerAccount = useSelector(state => state?.auth?.payload?.sub?.login);
  const filterMembers = chat.members.filter(member => member.login !== loginOwnerAccount);
  const login = filterMembers[0]?.login;
  const [isActive, setIsActive] = useState(false);
  const avatar = URLWithoutGQL + "/" + chat?.members[0]?.avatar?.url;

  const chatId = chat?._id;
  const lastMessage = chat?.lastMessage?.text;

  const navigate = useNavigate();

  const memberId = useSelector((state) => state?.auth?.payload?.sub?.id);

  const selectedChat = () => {
    setIsActive(true);
  };

  const deleteChat = async ({ memberId, chatId, event }) => {
    event.preventDefault();
    event.stopPropagation();
    const filterMember = chat.members
      .filter(member => member._id !== memberId)
      .map(({ _id }) => ({ _id }));
    await dispatch(actionPromise("promiseChatDelete", chatDelete(chatId, filterMember)));
    navigate("/SecondPage");

  };

  useEffect(() => {
    setIsActive(location.pathname === `/SecondPage/${chatId}`);

  }, [location.pathname]);

  return (<div onClick={() => selectedChat(chatId)}>
    <Link
      className={`${style.personNick} ${isActive ? style.active : ''}`}
      to={`/SecondPage/${chatId}`}
    >
      <Avatar
        className={style.avatar}
        src={avatar}
      >
       {/*{login.slice(0, 2)}*/}
      </Avatar>

      <div className={style.nickAndLastMessage}>
        <span className={style.title}>{chat.title ? chat.title : null} </span>
        <span className={style.login}>{chat.members.length > 2 ? "group" : login} </span>
        {lastMessage ? <span className={style.lastMessage}>{`${lastMessage.slice(0, 8)}...`}</span> : ''}
      </div>
      <DeleteOutlineIcon
        className={style.trashBasket}
        onClick={(event) => {
          deleteChat({ event, memberId, chatId });
        }}
      />
    </Link>
  </div>);
};


