import { loginUser, registrationUser } from '../api';


const jwtDecode = (token) => {
  try {
    let split = token.split('.', 2);
    return JSON.parse(atob(split[1]));
  } catch (e) {
    alert('Ты не зарегистрирован ');
  }
};



export function authReducer(state = {}, { type, token }) {
  if (token) {
    localStorage.authToken = token;
  }

  if (type === 'AUTH_LOGIN') {
    let payload = jwtDecode(token);
    return {
      token, payload,
    };
  }
  if (type === 'AUTH_LOGOUT') {
    delete localStorage.authToken;
    return {};
  }
  return state;
}

export const actionAuthLogin = token => ({ type: 'AUTH_LOGIN', token });
export const actionAuthLogout = () => ({ type: 'AUTH_LOGOUT' });

export function fullLogin(login, password) {

  return async dispatch => {
    const response = await loginUser(login, password);
    console.log(response);
        if (response?.data?.login) {
          dispatch(actionAuthLogin(response?.data?.login));
    }
  };
}

export function fullRegistration(login, password, nick) {
  return async dispatch => {
    const response = await  registrationUser(login, password, nick);
    if (response?.data?.UserUpsert) {
      dispatch(fullLogin(login, password));
    }
  };
}

