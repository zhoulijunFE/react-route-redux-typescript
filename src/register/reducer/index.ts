import { combineReducers } from 'redux';

import * as actionType from '../action/actionType';

const register = (state = {}, action:any) => {
  switch (action.type) {
    case actionType.RECEIVE_REGISTER:
      return action.register
    default:
      return state
  }
}

const todoApp = combineReducers({
  register
})