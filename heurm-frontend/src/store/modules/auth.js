import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';
import * as AuthAPI from 'lib/api/auth';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const SET_ERROR = 'auth/SET_ERROR';
const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const LOCAL_REGISTER_SUCCESS = 'auth/LOCAL_REGISTER_SUCCESS';

export const actionCreators = {
  changeInput: createAction(CHANGE_INPUT), // { form, name, value }
  initializeForm: createAction(INITIALIZE_FORM), // form
  setError: createAction(SET_ERROR), // { form, message }
  localRegister: createAction(LOCAL_REGISTER, AuthAPI.localRegister) // { email, username, password }
};

const initialState = Record({
  login: Record({
    form: Record({
      email: '',
      password: ''
    })(),
    error: null
  })(),
  register: Record({
    form: Record({
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    })(),
    error: null
  })(),
  result: Record({})()
})();

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      const { form, name, value } = action.payload;

      return state.setIn([form, 'form', name], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
      const initialForm = initialState[action.payload];

      return state.set(action.payload, initialForm);
    },
    [SET_ERROR]: (state, action) => {
      const { form, message } = action.payload;

      return state.setIn([form, 'error'], message);
    },
    [LOCAL_REGISTER_SUCCESS]: (state, action) => {
      return state.set('result', action.payload.data);
    }
  },
  initialState
);
