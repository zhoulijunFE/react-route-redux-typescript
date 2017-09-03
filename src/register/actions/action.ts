import { actionTypes } from './actionTypes';
import * as service from '../services/index';
import { IRegisterResult } from '../modal/registerResult';

const requestRegister = () => ({
    type: actionTypes.REQUEST_REGISTER
})

const receiveRegister = (register: IRegisterResult) => ({
    type: actionTypes.RECEIVE_REGISTER,
    register
})

// TODO(zhoulj) modal目录添加传递参数对象抽取，替换object
export const fetchRegister = (opts?: object) => (dispatch: any) => {
    dispatch(requestRegister());
    return service.register(opts)
        .then(data => {
            dispatch(receiveRegister(data))
        }, data => {
            //TODO(zhoulj) 公共异常弹框, 后续可删除
        })
}