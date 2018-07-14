import { bindActionCreators } from 'redux';
import store from './index';

import { actionCreators as baseActions } from './modules/base';
import { actionCreators as authActions } from './modules/auth';

const { dispatch } = store;

export const BaseActions = bindActionCreators(baseActions, dispatch);
export const AuthActions = bindActionCreators(authActions, dispatch);
