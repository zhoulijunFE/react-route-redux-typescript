import * as httpUtil from '../../util/httpUtil';
import { IRegisterResult } from '../modal/registerResult';

export function register(opts?: object): Promise<any> {
    return httpUtil.get('/mgt/register', opts);
}