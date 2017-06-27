import * as httpUtil from '../../util/httpUtil';

export function register(opts?: object) {
    return httpUtil.get('/mgt/register', opts);
}