import env from '../config/env';

function getQuery(): any {
    let query: any = {};
    let search: string = window.location.search;
    if (search.indexOf('?') > 0) {
        search = search.substring(1);
        const values: string[] = search.split("&");
        values.length && values.forEach((value) => {
            const strs: string[] = value.split("=");
            query[strs[0]] = strs[1];
        })
    }
    return query;
}

function switchLocale(locale: string): string {
    // NOTE(zhoulj) IntlProvider locale默认支持'-'
    return locale.replace('_', '-');
}

function getLocale(): string {
    const query = getQuery();
    // NOTE(zhoulj) locale、lang老模块传入参数不同兼容
    let locale = query['locale'] || query['lang'] || env.LOCALE;
    return locale = switchLocale(locale);
}

export const locale = getLocale();