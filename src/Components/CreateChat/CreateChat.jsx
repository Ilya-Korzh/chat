import Input from '../Input/Input';
import { Button, CircularProgress } from '@mui/material';
import { actionPromise } from '../../Store/promiseReduser';
import { createChat, getUserByLogin } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import style from "./CreateChat.module.css";
import { Members } from '../Members/Members';
import { useNavigate } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { type } from '@testing-library/user-event/dist/type';

export const CreateChat = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState(true);
  const [members, setMembers] = useState({});
  const dispatch = useDispatch();

  const dataUserLogin = useSelector(state => state?.promise?.promiseGetUserByLogin?.payload?.data?.UserFindOne);
  const statusUserLogin = useSelector(state => state?.promise?.promiseGetUserByLogin?.status);
  const statusChatLogin = useSelector(state => state?.promise?.promiseCreateChat?.status);

  const handleKeyPress = async (event) => {

    if (event.key === 'Enter' || event.type==='click') {

      setError(true);
      const stateGetUserByLogin = await dispatch(actionPromise("promiseGetUserByLogin", getUserByLogin(login)));
      const id = stateGetUserByLogin?.data?.UserFindOne?._id;
      if (id) {
        setMembers(prevState => ({ ...prevState, [login]: id }));
        setLogin('');
      }
    }
  };

  const createChatButton = () => {

    let fullMembers = [];
    for (const memberId in members) {
      fullMembers.push({ _id: members[memberId] });
    }
    if (fullMembers.length > 0) {
      dispatch(actionPromise("promiseCreateChat", createChat(fullMembers, title)));
      setTitle("");
      navigate("/SecondPage");
    } else {
      alert(`Please add login`);
    }
    setMembers([]);
  };

  const showError = () => {
    setError(false);
  };

  return (<>
    <div className={style.wrapperInputs}>
      < Input
        width={"100"}
        value={title}
        setValue={setTitle}
        text={"Title"}
        placeHolder={"Write title if you want"}
      />
      {statusChatLogin !== "PENDING" ? <div className={style.wrapperInputAddMember}>
        < Input
          width={"100"}
          keyPress={handleKeyPress}
          value={login}
          setValue={setLogin}
          text={"Login"}
          placeHolder={"Write login and press enter "}
        />
        <PersonAddAltIcon
          className={style.addMemberIcon}
        onClick={handleKeyPress}
        />
      </div> : <CircularProgress />}
    </div>

    {Object.keys(members).length > 0 ? <Members members={members} setMembers={setMembers} /> : null}

    {!dataUserLogin && error && statusUserLogin === 'FULFILLED' && (<>
      <span className={style.spanError}>Such user doesn't exist</span>
      <Button
        sx={{ width: "90%" }}
        onClick={showError} variant="contained"
      >Close</Button>
    </>)}

    <Button
      sx={{
        width: "90%", marginTop: "20px"
      }}
      onClick={createChatButton} variant="contained"
    >Create chat</Button>

  </>);
};

