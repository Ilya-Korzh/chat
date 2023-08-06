import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from '../RegistrationPage/RegistrationPage.module.css';
import { fullLogin } from '../../Store/authReducer';
import { Button } from '@mui/material';
import { InputPassword } from '../../Components/Input/InputPassword';
import { InputLogin } from '../../Components/Input/InputLogin';

export function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state?.auth?.token);
  const state = useSelector(state => state?.promise);

  const { status, payload } = state?.promiseLoginUser || {};

  const handleSubmit = async () => {
    await dispatch(fullLogin(login, password));

  };

  const handleAlertClose = () => {
    setShowError(false);
  };

  useEffect(() => {

    if (authState) {
      navigate("/SecondPage");
    }
    if (payload?.data?.login === null) {
      setShowError(true);
    }
  }, [navigate, authState, payload]);
  const goToRegistration = () => {
    navigate("/registration");
  }

  return (<div className={style.container}>
    <fieldset className={style.wrapperRegisterCard}>

      <InputLogin value={login} setValue={setLogin} text="Email" />
      <InputPassword password={password} setPassword={setPassword} />

      <div className={style.wrapperButton}>
        <Button onClick={handleSubmit} variant="contained">Log in</Button>
        <Button onClick={goToRegistration}  variant="contained">Registration</Button>
      </div>

      {status === "FULFILLED" && showError && payload?.data?.login === null && (<div className={style.wrapperError}>
        <span className={style.error}>Please register here if you want to join us </span>
        {'  '}

        <Button onClick={handleAlertClose} variant="contained">Close</Button>

      </div>)}

    </fieldset>

  </ div>);
}








