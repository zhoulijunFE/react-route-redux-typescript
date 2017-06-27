import * as actionType from './actionType';
import * as service from '../service/index';

const requestRegister = () => ({
  type: actionType.REQUEST_REGISTER
})

const receiveRegister = (register: object) => ({
  type: actionType.RECEIVE_REGISTER,
  register
})

export const fetchRegister = (opts?:object) => (dispatch:any, getState:Function) => {
  dispatch(requestRegister())
  return service.register(opts)
    .then(data => {
      dispatch(receiveRegister(data))
    }, data => {
      //TODO(zhoulj) 公共异常弹框, 后续可删除
      dispatch(receiveRegister(data))
    })
}