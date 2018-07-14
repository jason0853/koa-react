import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY';

export const actionCreators = {
  setHeaderVisibility: createAction(SET_HEADER_VISIBILITY) // visible
};

const initialState = Record({
  header: Record({
    visible: true
  })()
})();

export default handleActions(
  {
    [SET_HEADER_VISIBILITY]: (state, action) =>
      state.setIn(['header', 'visible'], action.payload)
  },
  initialState
);
