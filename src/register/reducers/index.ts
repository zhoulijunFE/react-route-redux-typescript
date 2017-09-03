import { combineReducers } from 'redux';

import { actionTypes } from '../actions/actionTypes';

// TODO(zhoulj) modal目录添加state抽象对象集合， 页面渲染也读取这些对象集合
const register = (state = {}, action: any) => {
    switch (action.type) {
        case actionTypes.RECEIVE_REGISTER:
          return action.register;
        default:
          return state;
    }
}

const reducer = combineReducers({
    register
})