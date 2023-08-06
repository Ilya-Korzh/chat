import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./RegistrationPage.module.css";
import { fullRegistration } from '../../Store/authReducer';
import { useNavigate } from 'react-router-dom';
import { InputLogin } from '../../Components/Input/InputLogin';
import { InputPassword } from '../../Components/Input/InputPassword';
import { Button } from '@mui/material';

export const RegistrationPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const state = useSelector((state) => state.promise);
  const { payload } = state?.promiseRegistrationUser || {};
  const handleSubmit = async () => {
    dispatch(fullRegistration(login, password));
    if (payload?.errors?.length > 0) {
      setShowError(true);
    }
  };

  const handleAlertClose = () => setShowError(false);
  const navigate = useNavigate();
  const authState = useSelector((state) => state?.auth?.token);
  useEffect(() => {
    if (authState) {
      navigate("/SecondPage");
    }
  }, [navigate, authState]);

  return (<div className={style.container}>
    <fieldset className={style.wrapperRegisterCard}>
      <InputLogin login={login} setValue={setLogin} text="Email" />
      <InputPassword password={password} setPassword={setPassword} />
      <Button onClick={handleSubmit} variant="contained">Create</Button>

      {showError && payload?.errors?.length > 0 && (<div className={style.wrapperError}>
        <span> {payload.errors[0].message}</span>
        {'  '}
        <button onClick={handleAlertClose}>Close</button>
      </div>)}
    </fieldset>

  </div>);
};
